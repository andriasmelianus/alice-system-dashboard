<template>
  <!-- <v-container class="fill-height" fluid> -->
  <div>
    <div class="d-flex flex-wrap justify-center">
      <service-widget-link-one class="ma-2 align-self-start"></service-widget-link-one>

      <role-widget-link-one class="ma-2 align-self-start"></role-widget-link-one>

      <user-widget-link-for-system class="ma-2 align-self-start"></user-widget-link-for-system>

      <company-widget-link-for-system class="ma-2 align-self-start"></company-widget-link-for-system>

      <user-widget-link-one class="ma-2 align-self-start"></user-widget-link-one>

      <company-widget-link-one class="ma-2 align-self-start"></company-widget-link-one>

      <link-to-testing-page class="ma-2 align-self-start"></link-to-testing-page>
    </div>

    <div class="d-flex flex-wrap justify-center mt-4">
      <sale-widget-line-chart class="ma-2 align-self-start"></sale-widget-line-chart>

      <purchase-widget-line-chart class="ma-2 align-self-start"></purchase-widget-line-chart>

      <company-widget-line-chart class="ma-2 align-self-start"></company-widget-line-chart>
    </div>

    <div class="d-flex flex-wrap justify-center">
      <customer-widget-list-one class="ma-2 align-self-start"></customer-widget-list-one>
    </div>
  </div>
</template>

<script>
import ServiceWidgetLinkOne from "~/components/service/widget/link-one";
import RoleWidgetLinkOne from "~/components/role/widget/link-one";
import UserWidgetLinkForSystem from "~/components/user/widget/link-for-system";
import CompanyWidgetLinkForSystem from "~/components/company/widget/link-for-system";
import UserWidgetLinkOne from "~/components/user/widget/link-one";
import CompanyWidgetLinkOne from "~/components/company/widget/link-one";
import LinkToTestingPage from "~/components/_other/widget/link-to-testing-page";

import SaleWidgetLineChart from "~/components/sale/widget/line-chart";
import PurchaseWidgetLineChart from "~/components/purchase/widget/line-chart";
import CompanyWidgetLineChart from "~/components/company/widget/line-chart";

import CustomerWidgetListOne from "~/components/customer/widget/list-one";

export default {
  middleware: "auth",
  layout: "dashboard",
  head() {
    return {
      title: "Dashboard"
    };
  },

  components: {
    ServiceWidgetLinkOne,
    RoleWidgetLinkOne,
    UserWidgetLinkForSystem,
    CompanyWidgetLinkForSystem,
    UserWidgetLinkOne,
    CompanyWidgetLinkOne,
    LinkToTestingPage,

    SaleWidgetLineChart,
    PurchaseWidgetLineChart,
    CompanyWidgetLineChart,

    CustomerWidgetListOne
  }
};
</script>
