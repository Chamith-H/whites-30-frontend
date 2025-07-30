import { ChartType } from "./dashboard.model";

const emailSentBarChart: ChartType = {
  chart: {
    height: 340,
    type: "bar",
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "15%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: "Good Receipt Note",
      data: [44, 55, 41, 67, 22, 43, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Inventory Transfer",
      data: [13, 23, 20, 8, 13, 27, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Production Receipt",
      data: [11, 17, 15, 15, 21, 14, 0, 0, 0, 0, 0, 0],
    },
  ],
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  colors: ["#556ee6", "#f1b44c", "#34c38f"],
  legend: {
    position: "bottom",
  },
  fill: {
    opacity: 1,
  },
};

const monthlyEarningChart: ChartType = {
  chart: {
    height: 200,
    type: "radialBar",
    offsetY: -10,
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      dataLabels: {
        name: {
          fontSize: "13px",
          color: undefined,
          offsetY: 60,
        },
        value: {
          offsetY: 22,
          fontSize: "16px",
          color: undefined,
          formatter: (val) => {
            return val + "%";
          },
        },
      },
    },
  },
  colors: ["#556ee6"],
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 0.15,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91],
    },
  },
  stroke: {
    dashArray: 4,
  },
  series: [21],
  labels: ["Wastage"],
};

const transactions = [
  {
    id: "#SK2540",
    name: "Neal Matthews",
    date: "07 Oct, 2019",
    total: "$400",
    status: "Paid",
    payment: ["fa-cc-mastercard", "Mastercard"],
    index: 1,
  },
  {
    id: "#SK2541",
    name: "Jamal Burnett",
    date: "07 Oct, 2019",
    total: "$380",
    status: "Chargeback",
    payment: ["fa-cc-visa", "Visa"],
    index: 2,
  },
  {
    id: "#SK2542",
    name: "Juan Mitchell",
    date: "06 Oct, 2019",
    total: "$384",
    status: "Paid",
    payment: ["fab fa-cc-paypal", "Paypal"],
    index: 3,
  },
  {
    id: "#SK2543",
    name: "Barry Dick",
    date: "05 Oct, 2019",
    total: "$412",
    status: "Paid",
    payment: ["fa-cc-mastercard", "Mastercard"],
    index: 4,
  },
  {
    id: "#SK2544",
    name: "Ronald Taylor",
    date: "04 Oct, 2019",
    total: "$404",
    status: "Refund",
    payment: ["fa-cc-visa", "Visa"],
    index: 5,
  },
  {
    id: "#SK2545",
    name: "Jacob Hunter",
    date: "04 Oct, 2019",
    total: "$392",
    status: "Paid",
    payment: ["fab fa-cc-paypal", "Paypal"],
    index: 6,
  },
];

const statData = [
  {
    icon: "bx bx-copy-alt",
    title: "Pending GRN Inspections",
    value: "4",
  },
  {
    icon: "bx bx-archive-in",
    title: "Pending Inventory Transfers",
    value: "0",
  },
  {
    icon: "bx bx-purchase-tag-alt",
    title: "Pending Production Receipts",
    value: "0",
  },
];

export { emailSentBarChart, monthlyEarningChart, transactions, statData };
