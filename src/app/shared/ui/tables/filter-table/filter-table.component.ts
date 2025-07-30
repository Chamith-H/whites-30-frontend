import { Component, EventEmitter, Input, Output } from "@angular/core";
import * as moment from "moment";
import { EvalType } from "src/app/core/enums/shared-enums/filter-table.enum";
import { TAction } from "src/app/core/models/shared/filter-table.model";
import { AccessControlService } from "src/app/core/services/app-services/authentication/access-control.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-filter-table",
  templateUrl: "./filter-table.component.html",
  styleUrls: ["./filter-table.component.scss"],
})
export class FilterTableComponent {
  @Input() tableOptions: any = null;
  @Input() showImage: boolean = false;
  @Input() colcount: number = 0;
  @Input() loading: boolean = false;
  @Output() pageChanger = new EventEmitter();
  @Output() searchFilter = new EventEmitter();
  @Output() resetFilter = new EventEmitter();
  @Output() filterValues = new EventEmitter();
  @Output() actionSetter = new EventEmitter();

  selectedPage: number = 1;

  constructor(private accessControlService: AccessControlService) {}

  //!--> Fetching table description values................................|
  fetchValue(dataObject: any, evalObject: any) {
    let fetchedValue = null;

    evalObject.value.map((element, index) => {
      if (index === 0) {
        fetchedValue = dataObject[element];
      } else {
        fetchedValue = fetchedValue[element];
      }
    });

    if (
      evalObject.type === EvalType.TEXT ||
      evalObject.type === EvalType.CUSTOM
    ) {
      return fetchedValue || "___";
    } else if (evalObject.type === EvalType.COUNT) {
      return fetchedValue.length;
    } else if (evalObject.type === EvalType.BOOLEAN) {
      if (fetchedValue === true) {
        return evalObject.true;
      } else {
        return evalObject.false;
      }
    } else if (evalObject.type === EvalType.DATE) {
      let dateValue = moment(fetchedValue).format("DD MMM YYYY");
      return dateValue;
    }
  }

  //!--> Styling & rendering table descriptions............................|
  styleValue(dataObject: any, evalObject: any) {
    let fetchedValue = null;

    evalObject.value.map((element, index) => {
      if (index === 0) {
        fetchedValue = dataObject[element];
      } else {
        fetchedValue = fetchedValue[element];
      }
    });

    if (evalObject.type === EvalType.TEXT) {
      return {
        style: "NO_STYLE",
        class: "NO_CLASS",
      };
    } else if (evalObject.type === EvalType.COUNT) {
      return {
        style: "NO_STYLE",
        class: "NO_CLASS",
      };
    } else if (evalObject.type === EvalType.BOOLEAN) {
      if (fetchedValue === true) {
        return {
          style: "BOOLEAN",
          class: "bg-success custom-font text-white px-2 rounded-5",
        };
      } else {
        return {
          style: "BOOLEAN",
          class: "bg-danger custom-font text-white px-2 rounded-5",
        };
      }
    } else if (evalObject.type === EvalType.CUSTOM) {
      const styler = evalObject.options.find(
        (e_option: any) => e_option.optValue === fetchedValue
      );

      if (styler.class === 1) {
        return {
          style: "BOOLEAN",
          class: "bg-warning custom-font text-white px-2 rounded-5",
        };
      } else if (styler.class === 2) {
        return {
          style: "BOOLEAN",
          class: "bg-success custom-font text-white px-2 rounded-5",
        };
      } else if (styler.class === 3) {
        return {
          style: "BOOLEAN",
          class: "bg-primary custom-font text-white px-2 rounded-5",
        };
      } else if (styler.class === 4) {
        return {
          style: "BOOLEAN",
          class: "bg-info custom-font text-white px-2 rounded-5",
        };
      } else if (styler.class === 5) {
        return {
          style: "BOOLEAN",
          class: "bg-danger custom-font text-white px-2 rounded-5",
        };
      } else {
        return {
          style: "BOOLEAN",
          class: "bg-secondary custom-font text-white px-2 rounded-5",
        };
      }
    } else if (evalObject.type === EvalType.DATE) {
      return {
        style: "NO_STYLE",
        class: "NO_CLASS",
      };
    }
  }

  //!--> View permission button............................................|
  viewButton(status: any) {
    if (!status || status === null || status === undefined) {
      return true;
    } else if (status === "Y") {
      return true;
    } else {
      return false;
    }
  }

  //!--> Actions Th & Td remover...........................................|
  actionViewer() {
    const options = this.tableOptions.tableItems.actions.options;
    const requiredPermissions = Object.keys(options).map(
      (key) => options[key].permission
    );

    const showActionTabs =
      this.accessControlService.confirm_leastOneAccess(requiredPermissions);

    return showActionTabs;
  }

  //!--> Pagination button click...........................................|
  changePage(pageNo: number) {
    this.pageChanger.emit(pageNo);
  }

  //!--> Pagination page dropdown..........................................|
  pageLoop() {
    let maxPage = this.tableOptions.paginationItems.pageCount;
    let pages = [];

    for (let i = 1; i <= maxPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  //!--> Get action.........................................................|
  tableAction(act: string, id: string, data: any) {
    const actionOptions: TAction = {
      action: act,
      id: id,
      data: data,
    };

    if (act === "delete") {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete this ${this.tableOptions.tableItems.actions.target}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.actionSetter.emit(actionOptions);
        }
      });
    } else {
      this.actionSetter.emit(actionOptions);
    }
  }

  //!--> Filter value onChanger.............................................|
  valueChange(key: string, event: any) {
    const vObject = {
      key: key,
      value: event.target.value,
    };

    this.filterValues.emit(vObject);
  }

  //!--> filter activate....................................................|
  filter() {
    this.searchFilter.emit();
  }

  reset() {
    this.resetFilter.emit();
  }
}
