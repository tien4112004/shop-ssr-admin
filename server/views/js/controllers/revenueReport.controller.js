
import { offset } from "@floating-ui/dom";
import toast from "../components/toast";
import UserService from "../services/user.service";
import Pagination from "../ui-components/pagination";
import UserListRow from "../ui-components/userListRow";
import AdminService from "../services/admin.service";

import ApexCharts from 'apexcharts';
import theme from "quill/core/theme.js";
import colors from "tailwindcss/colors";
import themeConfig from "tailwindcss/defaultConfig";


export default class RevenueReportController {
    PAGE_SIZE = 10;

    currentPage = 1;

    constructor() {
        this.startDate = document.getElementById("start-date").value;
        this.endDate = document.getElementById("end-date").value;
        this.sortBy = document.getElementById("sort-by").value;
        this.order = document.getElementById("order").value;
        this.timeRange = document.getElementById("time-range").value;
        this.filterForm = document.getElementById("filter-form");
        this.table = document.getElementById("revenue-table");
        this.chart = document.getElementById("column-chart");
    }

    init() {
        this.filterForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            // clear table
            this.table.querySelector('tbody').innerHTML = "";

            this.startDate = document.getElementById("start-date").value;
            this.endDate = document.getElementById("end-date").value;
            this.sortBy = document.getElementById("sort-by").value;
            this.order = document.getElementById("order").value;
            this.timeRange = document.getElementById("time-range").value;
            this.totalRevenue = document.getElementById("total-revenue");
            this.totalOrder = document.getElementById("total-order");

            console.log(this.startDate, this.endDate, this.currentPage, this.PAGE_SIZE, this.sortBy, this.order, this.timeRange);
            await this.fetchRevenueReport(this.startDate, this.endDate, this.currentPage, this.PAGE_SIZE, this.sortBy, this.order, this.timeRange);
        });

        document.addEventListener("DOMContentLoaded", async () => {

        });
    }

    async fetchRevenueReport(startDate, endDate, page = 1, pageSize = 10, sortBy = 'createdAt', order = 'desc', timeRange = 'day') {
        try {
            console.log(startDate, endDate, page, pageSize, sortBy, order, timeRange);

            // Fetch the revenue data
            const {totalRevenue, totalCount, revenue} = await AdminService.getRevenueReport(
                startDate,
                endDate,
                page,
                pageSize,
                sortBy,
                order,
                timeRange
            );

            const tbody = this.table.querySelector('tbody');
            tbody.innerHTML = "";

            this.totalRevenue.innerHTML = `Total revenue: $${totalRevenue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
            this.totalOrder.innerHTML = `Total orders: ${totalCount}`;

            if (revenue.length) {
                if (this.chart) {
                    this.chart.innerHTML="";
                }
                this.chart = new ApexCharts(document.getElementById("column-chart"), {
                    series: [
                        {
                            name: 'Revenue',
                            data: revenue.map(record => record.totalAmount),
                        },
                    ],
                    tooltip: {
                        enabled: true,
                        enabledOnSeries: undefined,
                        shared: true,
                        followCursor: true,
                        intersect: false,
                        inverseOrder: true,
                        custom: undefined,
                        hideEmptySeries: true,
                        fillSeriesColor: true,
                    },
                    chart: {
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: false,
                        },
                        toolbar: {
                            show: false,
                        },
                        fontFamily: themeConfig.theme.fontFamily.sans,
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        width: 2,
                        curve: 'smooth',
                    },
                    grid: {
                        row: {
                            colors: ['transparent'],
                            opacity: 0.5,
                        },
                        borderColor: theme === 'dark' ? colors.slate['600'] : colors.slate['200'],
                    },
                    xaxis: {
                        categories: revenue.map(record => {
                            const [start, end] = record.timeGroup.split(" to ");
                            return start === end ? start.toString() : record.timeGroup.toString();
                        }),
                        axisBorder: {
                            color: theme === 'dark' ? colors.slate['600'] : colors.slate['200'],
                        },
                        axisTicks: {
                            color: theme === 'dark' ? colors.slate['600'] : colors.slate['200'],
                        },
                    },
                });

                await this.chart.render();

                revenue.forEach(record => {
                    const timeGroup = record.timeGroup.split(" to ")[0] === record.timeGroup.split(" to ")[1]
                        ? record.timeGroup.split(" to ")[0]
                        : record.timeGroup;

                    tbody.innerHTML += `
                    <tr>
                        <td>${timeGroup}</td>
                        <td>$${record.totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                    </tr>
                `;
                });
            }
        } catch (error) {
            console.error("Error fetching revenue report:", error);
        }
    }
}