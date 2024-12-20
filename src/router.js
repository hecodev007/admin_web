import Vue from "vue";
import Router from "vue-router";
import iView from "iview";

import asset from './views/asset/index.vue'

Vue.use(Router);

const routes = [
  {
    path: "/login",
    component: () => import("./views/login/index.vue")
  },
  {
    path: "/password/find",
    component: () => import("./views/password/find.vue")
  },
  {
    path: '/oauth/redirect',
    component: () => import('./views/login/oauth_redirect.vue')
  },
  {
    path: "/",
    component: () => import("./views/index/index.vue"),
    children: [
      {
        path: "/",
        meta: {
          name: "首页"
        },
        component: () => import("./views/index/home.vue")
      },
      {
        path: "/push_token",
        meta: {
          name: "上币"
        },
        component: () => import("./views/token/push_new_token.vue"),
      },
      {
        path: "/change_contract",
        meta: {
          name: "修改合约操作"
        },
        component: () => import("./views/token/change_contract.vue"),
      },
      {
        path: "/change_contract_record",
        meta: {
          name: "修改合约记录"
        },
        component: () => import("./views/token/change_contract_record.vue"),
      },
      {
        path: "/token",
        meta: {
          name: "币种列表"
        },
        component: () => import("./views/token/index.vue"),
      },
      {
        path: "/token_miner_fee",
        meta: {
          name: "手续费列表"
        },
        component: () => import("./views/token/miner_fee.vue"),
      },
      {
        path: "/token_details",
        meta: {
          name: "币种设置"
        },
        component: () => import("./views/token/detail.vue"),
      },
      {
        path: "/token_grpc",
        meta: {
          name: "币种网络"
        },
        component: () => import("./views/token/network.vue"),
      },
      {
        path: "/broker",
        meta: {
          name: "券商管理"
        },
        component: () => import("./views/broker/index.vue")
      },
      {
        path: "/asset",
        meta: {
          name: "资金账号"
        },
        component: asset,
        //component: () => import("./views/asset/index.vue")
      },
      {
        path: "/asset_report",
        meta: {
          name: "资产统计"
        },
        component: () => import('./views/asset/asset_report.vue')
      },
      {
        path: "/asset_page",
        meta: {
          name: "资产列表"
        },
        component: () => import('./views/asset/asset_tables.vue')
      },
      {
        path: '/asset_flow_page',
        meta: {
          icon: 'md-grid',
          name: '资产流水'
        },
        component: () => import('./views/asset/asset_flow_tables.vue')
      },
      {
        path: "/address_report",
        meta: {
          name: "地址统计"
        },
        component: () => import('./views/address/address_report.vue')
      },
      {
        path: "/address_table",
        meta: {
          name: "地址列表"
        },
        component: () => import('./views/address/address_tables.vue')
      },
      {
        path: "/account_address",
        meta: {
          name: "账户地址"
        },
        component: () => import('./views/address/account_address.vue')
      },
      {
        path: "/black_list",
        meta: {
          name: "地址黑名单"
        },
        component: () => import('./views/address/black_list.vue')
      },
      {
        path: "/add_hot_address",
        meta: {
          name: "添加热钱包地址"
        },
        component: () => import('./views/address/add_hot_address.vue')
      },
      {
        path: "/deposit_order",
        meta: {
          name: "充币订单"
        },
        component: () => import('./views/order/deposit_order_tables.vue')
      },
      {
        path: "/withdrawal_order",
        meta: {
          name: "提币订单"
        },
        component: () => import('./views/order/withdrawal_order_tables.vue')
      },
      {
        path: "/collect_order",
        meta: {
          name: "归集订单"
        },
        component: () => import('./views/order/collect_order_tables.vue')
      },
      {
        path: "/exception_withdrawal_order",
        meta: {
          name: "异常提币订单"
        },
        component: () => import('./views/order/exception_withdrawal_order.vue')
      },
      {
        path: "/redis",
        meta: {
          name: "Redis操作"
        },
        component: () => import('./views/order/redis.vue')
      },
      {
        path: "/handle_withdrawal_order",
        meta: {
          name: "提现单处理"
        },
        component: () => import('./views/order/handle_withdrawal_order.vue')
      },
      {
        path: "/notify_order",
        meta: {
          name: "通知订单"
        },
        component: () => import('./views/order/notify_order.vue')
      },
      {
        path: "/deposit_blacklist_order",
        meta: {
          name: "黑名单充值订单"
        },
        component: () => import('./views/order/deposit_blacklist_tables.vue')
      },
      {
        path: "/order_flow_report",
        meta: {
          name: "订单统计"
        },
        component: () => import('./views/order/order_flow_report.vue')
      },
      {
        path: "/asset_check",
        meta: {
          name: "资产校对"
        },
        component: () => import('./views/asset/asset_check.vue')
      },
      {
        path: "/asset_check_report",
        meta: {
          name: "资产校对统计"
        },
        component: () => import('./views/asset/asset_check_report.vue')
      },
      {
        path: "/wallet_admin_log",
        meta: {
          name: "管理后台日志"
        },
        component: () => import('./views/log/wallet_admin_log.vue')
      },
      {
        path: "/collect_to_hot",
        meta: {
          name: "归集到运营钱包"
        },
        component: () => import('./views/wallet_client/collect_to_hot.vue')
      },
      {
        path: "/give_fee",
        meta: {
          name: "给矿工费"
        },
        component: () => import('./views/wallet_client/give_fee.vue')
      },
      {
        path: "/system",
        meta: {
          name: "系统设置"
        },
        component: () => import('./views/system/system.vue')
      },
    ]
  }
];

const router = new Router({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
  let arr = ["Wallet-管理系统"];
  if (route.meta.name) {
    arr.unshift(route.meta.name);
  }
  document.setTitle(arr.join("-"));
});

export default router;
