import Vue from "vue";
import Router from "vue-router";
import iView from "iview";
import Main from '@/components/main'
import { localRead, localSave } from "@/libs/util"
import Cookies from "js-cookie";

Vue.use(Router);

// 静态路由
export const constantRouter = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/password/find",
    component: () => import("@/views/password/find.vue")
  },
  {
    path: '/oauth/redirect',
    component: () => import('@/views/login/oauth_redirect.vue')
  },
  {
    path: "/",
    redirect: "/home",
    component: Main,
    meta: { hideInMenu: true, notCache: true },
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          hideInMenu: true,
          title: "首页",
          notCache: true,
          icon: "md-home"
        },
        component: () => import("@/views/index/home.vue")
      }
    ]
  },
  {
    path: "/401",
    name: "error_401",
    meta: { hideInMenu: true },
    component: () => import("@/views/error-page/401.vue")
  },
  {
    path: "/500",
    name: "error_500",
    meta: { hideInMenu: true },
    component: () => import("@/views/error-page/500.vue")
  },
  {
    path: "*",
    name: "error_404",
    meta: { hideInMenu: true },
    component: () => import("@/views/error-page/404.vue")
  }
];

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/password/find",
    name: "password",
    component: () => import("@/views/password/find.vue")
  },
  {
    path: '/oauth/redirect',
    name: 'redirect',
    component: () => import('@/views/login/oauth_redirect.vue')
  },
  {
    path: "/",
    component: () => import("@/views/index/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          name: "首页"
        },
        component: () => import("@/views/index/home.vue")
      },
      {
        path: "/token/push_token",
        name: "pushToken",
        meta: {
          name: "上币"
        },
        component: () => import("@/views/token/push_new_token.vue"),
      },
      {
        path: "/token/change_contract",
        name: "changeContract",
        meta: {
          name: "修改合约操作"
        },
        component: () => import("@/views/token/change_contract.vue"),
      },
      {
        path: "/token/change_contract_record",
        name: "changeContractRecord",
        meta: {
          name: "修改合约记录"
        },
        component: () => import("@/views/token/change_contract_record.vue"),
      },
      {
        path: "/token/token_list",
        name: "tokenList",
        meta: {
          name: "币种列表"
        },
        component: () => import("@/views/token/index.vue"),
      },
      {
        path: "/token/token_miner_fee",
        name: "tokenMinerFee",
        meta: {
          name: "手续费列表"
        },
        component: () => import("@/views/token/miner_fee.vue"),
      },
      {
        path: "/token/token_details",
        name: "tokenDetails",
        meta: {
          name: "币种设置"
        },
        component: () => import("@/views/token/detail.vue"),
      },
      {
        path: "/token/token_grpc",
        name: "tokenGrpc",
        meta: {
          name: "币种网络"
        },
        component: () => import("@/views/token/network.vue"),
      },
      {
        path: "/broker",
        name: "broker",
        meta: {
          name: "券商管理"
        },
        component: () => import("@/views/broker/index.vue")
      },
      {
        path: "/asset",
        name: "asset",
        meta: {
          name: "资金账号"
        },
        component: () => import("@/views/asset/index.vue")
      },
      {
        path: "/asset/asset_report",
        meta: {
          name: "资产统计"
        },
        component: () => import('@/views/asset/asset_report.vue')
      },
      {
        path: "/asset/asset_page",
        name: "assetPage",
        meta: {
          name: "资产列表"
        },
        component: () => import('@/views/asset/asset_tables.vue')
      },
      {
        path: '/asset/asset_flow_page',
        name: "assetFlowPage",
        meta: {
          icon: 'md-grid',
          name: '资产流水'
        },
        component: () => import('@/views/asset/asset_flow_tables.vue')
      },
      {
        path: "/address/address_report",
        name: "addressReport",
        meta: {
          name: "地址统计"
        },
        component: () => import('@/views/address/address_report.vue')
      },
      {
        path: "/address/address_table",
        name: "addressTable",
        meta: {
          name: "地址列表"
        },
        component: () => import('@/views/address/address_tables.vue')
      },
      {
        path: "/address/account_address",
        name: "accountAddress",
        meta: {
          name: "账户地址"
        },
        component: () => import('@/views/address/account_address.vue')
      },
      {
        path: "/address/black_list",
        name: "blackList",
        meta: {
          name: "地址黑名单"
        },
        component: () => import('@/views/address/black_list.vue')
      },
      {
        path: "/address/add_hot_address",
        name: "addHotAddress",
        meta: {
          name: "添加热钱包地址"
        },
        component: () => import('@/views/address/add_hot_address.vue')
      },
      {
        path: "/order/deposit_order",
        name: "depositOrder",
        meta: {
          name: "充币订单"
        },
        component: () => import('@/views/order/deposit_order_tables.vue')
      },
      {
        path: "/order/withdrawal_order",
        name: "withdrawalOrder",
        meta: {
          name: "提币订单"
        },
        component: () => import('@/views/order/withdrawal_order_tables.vue')
      },
      {
        path: "/order/withdrawal_approve",
        name: "withdrawalApprove",
        meta: {
          name: "提币审核"
        },
        component: () => import('@/views/order/withdrawal_approve_tables.vue')
      },
      {
        path: "/order/kytRefund",
        name: "KYTRefund",
        meta: {
          name: "KYT退款"
        },
        component: () => import('@/views/order/kytRefund.vue')
      },
      {
        path: "/order/collect_order",
        name: "collectOrder",
        meta: {
          name: "归集订单"
        },
        component: () => import('@/views/order/collect_order_tables.vue')
      },
      {
        path: "/exception/exception_withdrawal_order",
        name: "exceptionWithdrawalOrder",
        meta: {
          name: "异常提币订单"
        },
        component: () => import('@/views/order/exception_withdrawal_order.vue')
      },
      {
        path: "/exception/resend_charge",
        name: "resendCharge",
        meta: {
          name: "人工补录"
        },
        component: () => import('@/views/order/resend_charge.vue')
      },
      {
        path: "/exception/redis",
        name: "redis",
        meta: {
          name: "Redis操作"
        },
        component: () => import('@/views/order/redis.vue')
      },
      {
        path: "/exception/handle_withdrawal_order",
        name: "handleWithdrawalOrder",
        meta: {
          name: "提现单处理"
        },
        component: () => import('@/views/order/handle_withdrawal_order.vue')
      },
      {
        path: "/order/notify_order",
        name: "notifyOrder",
        meta: {
          name: "通知订单"
        },
        component: () => import('@/views/order/notify_order.vue')
      },
      {
        path: "/order/deposit_blacklist_order",
        name: "depositBlacklistOrder",
        meta: {
          name: "黑名单充值订单"
        },
        component: () => import('@/views/order/deposit_blacklist_tables.vue')
      },
      {
        path: "/order/order_flow_report",
        name: "orderFlowReport",
        meta: {
          name: "订单统计"
        },
        component: () => import('@/views/order/order_flow_report.vue')
      },
      {
        path: "/asset/asset_check",
        name: "assetCheck",
        meta: {
          name: "资产校对"
        },
        component: () => import('@/views/asset/asset_check.vue')
      },
      {
        path: "/asset/asset_check_report",
        name: "assetCheckReport",
        meta: {
          name: "资产校对统计"
        },
        component: () => import('@/views/asset/asset_check_report.vue')
      },
      {
        path: "/wallet/wallet_admin_log",
        name: "walletAdminLog",
        meta: {
          name: "管理后台日志"
        },
        component: () => import('@/views/log/wallet_admin_log.vue')
      },
      {
        path: "/wallet/collect_to_hot",
        name: "collectToHot",
        meta: {
          name: "归集到运营钱包"
        },
        component: () => import('@/views/wallet_client/collect_to_hot.vue')
      },
      {
        path: "/wallet/give_fee",
        name: "giveFee",
        meta: {
          name: "给矿工费"
        },
        component: () => import('@/views/wallet_client/give_fee.vue')
      },
      {
        path: "/system",
        name: "system",
        meta: {
          name: "系统设置"
        },
        component: () => import('@/views/system/system.vue')
      },
      {
        path: "/auth/user",
        name: "user",
        meta: {
          name: "用户管理"
        },
        component: () => import('@/views/auth/user.vue')
      },
      {
        path: "/auth/role",
        name: "role",
        meta: {
          name: "角色管理"
        },
        component: () => import('@/views/auth/role.vue')
      },
    ]
  },
  {
    path: "/401",
    name: "error_401",
    meta: { hideInMenu: true },
    component: () => import("@/views/error-page/401.vue")
  },
  {
    path: "/500",
    name: "error_500",
    meta: { hideInMenu: true },
    component: () => import("@/views/error-page/500.vue")
  },
  {
    path: "*",
    name: "error_404",
    meta: { hideInMenu: true },
    component: () => import("@/views/error-page/404.vue")
  }
];

const router = new Router({
  routes,
  mode: "history"
});

const LOGIN_PAGE_NAME = "login"; // 登录页
const HOME_PAGE_NAME = "home"; // 首页
const whiteList = ['login', 'password', 'redirect', 'error_401', 'error_404', 'error_500']; // 白名单

router.beforeEach((to, from, next) => {
  const _userLoginKey = Cookies.get('wallet-admin-jwt-login-key');
  // console.log(to)
  // console.log(from)

  // 进入登录页主动清除登录cookie
  if(to.name == LOGIN_PAGE_NAME) {
    // console.log(to.name)
    localSave("userInfo", ""); // 清空本地存储localStorage中的userInfo
    localSave("roleList", ""); // 清空localStorage中的roleList
    // Cookies.set('wallet-admin-jwt-auth-token', ''); // 清空本地登录信息
    // Cookies.set('wallet-admin-jwt-login-key', ''); // 请空本地登录信息
  }

  // 拦截路由
  if (whiteList.some(name => name === to.name)) {
    next(); // 在免登录白名单 -> 直接进入
  } else if (!_userLoginKey && to.name !== LOGIN_PAGE_NAME) {
    next({ name: LOGIN_PAGE_NAME }); // 未登录且要跳转的页面不是登录页 -> 跳转到登录页
  } else if (!_userLoginKey && to.name === LOGIN_PAGE_NAME) {
    next(); // 未登陆且要跳转的页面是登录页 -> 可跳转
  } else if (_userLoginKey && to.name === LOGIN_PAGE_NAME) {
    next({ name: HOME_PAGE_NAME }); // 已登录且要跳转的页面是登录页 -> 跳转到home页
  } else {
    // 剩余情况：已登录且要跳转的页面不是登录页
    if(to.name === HOME_PAGE_NAME) {
      next();
    } else {
      let _userInfo = JSON.parse(localRead('userInfo'))
      let _isRoot = _userInfo.isRoot

      if(_isRoot) {
        next();
      } else {
        let _userMenus = _userInfo.menus.split(',')
        // console.log(_userMenus)

        let _to = to.path.split('/')[(to.path.split('/')).length - 1]
        // console.log(_to)
        if(_userMenus.indexOf(to.name) > -1) {
          next();
        } else {
          console.warn('无权限访问:' + to.name)
          next({ name: HOME_PAGE_NAME })
        }
      }
    }
  }
  // iView.LoadingBar.start();
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