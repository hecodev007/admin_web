// 用户列表
const userList = [
  {
    user_id: "1",
    name: "goku",
    displayName: "孙悟空",
    phone: "13888888881",
    access: ["super_admin"]
    // avator: "https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png"
  },
  {
    user_id: "2",
    name: "trunks",
    displayName: "特兰克斯",
    phone: "13888888882",
    access: ["visitor"]
    // avator: "https://avatars0.githubusercontent.com/u/20942571?s=460&v=4"
  }
];

// 角色列表
const roleList = [
  {
    name: "super_admin",
    title: "超级管理员",
    menus: [
      "home", 
      "token", 
      "pushToken", 
      "tokenList", 
      "tokenDetails", 
      "tokengrpc", 
      "tokenMinerFee", 
      "address", 
      "addressReport", 
      "addressTable", 
      "accountAddress", 
      "blackList", 
      "addHotAddress", 
      "asset", 
      "assetPage", 
      "assetFlowPage", 
      "assetReport", 
      "order", 
      "orderFlowReport", 
      "depositOrder", 
      "withdrawalOrder", 
      "collectOrder", 
      "notifyOrder", 
      "depositBlacklistOrder", 
      "exception", 
      "exceptionWithdrawalOrder", 
      "redis", 
      "handleWithdrawalOrder", 
      "wallet", 
      "collectToHot", 
      "giveFee", 
      "walletAdminLog", 
      "system", 
      "auth", 
      "user", 
      "role"
    ],
    id: "1",
    description: "超级管理员，默认拥有全部功能，不可删除"
  },
  {
    name: "visitor",
    title: "访客",
    menus: [
      "home",
      "token",
      "tokenDetails",
      "address",
      "accountAddress",
      "order",
      "depositOrder",
    ],
    id: "2",
    description: "访客，拥有部分功能，可删除"
  }
];

/** menuList路由列表
 * isOutSide：是否为外链
 * showLevel：路由层级，详见menuLevel路由层级列表
 * path：前端组件路径（根父组件为Main，非根父组件为parentView，外链任意但不能为空）
 */

// 路由层级
const menuLevel = [
  {
    label: "菜单显示该页面选项，页面不含菜单栏",
    value: "1"
  },
  {
    label: "菜单显示该页面选项，页面含菜单栏",
    value: "2"
  },
  {
    label: "菜单隐藏该页面选项，页面不含菜单栏",
    value: "3"
  }
];

// 路由列表
const menuList = [
  {
    id: "home",
    name: "home",
    title: "首页",
    url: "home",
    path: "Main",
    sort: 24,
    parentId: "root",
    ico: "md-home",
    isOutSide: false,
    showLevel: "1",
    description: "首页",
    apiList: ["/api/v1/user/login_user_info"]
  },
  {
    id: "token",
    name: "token",
    title: "币种管理",
    url: "token",
    path: "Main",
    sort: 20,
    parentId: "root",
    ico: "logo-bitcoin",
    isOutSide: false,
    showLevel: "2",
    description: "币种管理"
  },{
    id: "pushToken",
    name: "pushToken",
    title: "上币",
    url: "push_token",
    path: "templete",
    sort: 4,
    parentId: "token",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "上币",
    apiList: ["/api/v1/push_new_token"]
  },{
    id: "tokenList",
    name: "tokenList",
    title: "币种列表",
    url: "tokenList",
    path: "templete",
    sort: 3,
    parentId: "token",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "币种列表",
    apiList: ["/api/v1/tokens", "/api/v1/token_types", "/api/v1/create_token", "/api/v1/update_token", "/api/v1/update_token", "/api/v1/update_token", "/api/v1/update_token"]
  },{
    id: "tokenDetails",
    name: "tokenDetails",
    title: "币种设置",
    url: "token_details",
    path: "templete",
    sort: 2,
    parentId: "token",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "币种设置",
    apiList: ["/api/v1/token_details", "/api/v1/create_token_details", "/api/v1/update_token_details"]
  },{
    id: "tokengrpc",
    name: "tokengrpc",
    title: "币种网络",
    url: "token_grpc",
    path: "templete",
    sort: 1,
    parentId: "token",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "币种网络",
    apiList: ["/api/v1/token_grpcs", "/api/v1/create_token_grpcs", "/api/v1/update_token_grpcs"]
  },{
    id: "tokenMinerFee",
    name: "tokenMinerFee",
    title: "手续费",
    url: "token_miner_fee",
    path: "templete",
    sort: 0,
    parentId: "token",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "手续费",
    apiList: ["/api/v1/miner_fee", "/api/v1/delete_miner_fee", "/api/v1/update_miner_fee", "/api/v1/create_miner_fee"]
  },{
    id: "address",
    name: "address",
    title: "地址管理",
    url: "address",
    path: "Main",
    sort: 18,
    parentId: "root",
    ico: "md-albums",
    isOutSide: false,
    showLevel: "2",
    description: "地址管理"
  },{
    id: "addressReport",
    name: "addressReport",
    title: "地址统计",
    url: "address_report",
    path: "templete",
    sort: 8,
    parentId: "address",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "地址统计",
    apiList: ["/api/v1/address_count_chart"]
  },{
    id: "addressTable",
    name: "addressTable",
    title: "地址列表",
    url: "address_table",
    path: "templete",
    sort: 7,
    parentId: "address",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "地址列表",
    apiList: ["/api/v1/addresses", "/api/v1/delete_addresses", "/api/v1/update_addresses", "/api/v1/create_address"]
  },{
    id: "accountAddress",
    name: "accountAddress",
    title: "账户地址",
    url: "account_address",
    path: "templete",
    sort: 6,
    parentId: "address",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "账户地址",
    apiList: ["/api/v1/account_address", "/api/v1/delete_account_address", "/api/v1/update_account_address", "/api/v1/create_account_address"]
  },{
    id: "blackList",
    name: "blackList",
    title: "地址黑名单",
    url: "black_list",
    path: "templete",
    sort: 5,
    parentId: "address",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "地址黑名单",
     apiList: ["/api/v1/black_list", "/api/v1/delete_black_list", "/api/v1/update_black_list", "/api/v1/create_black_list"]
  },{
    id: "addHotAddress",
    name: "addHotAddress",
    title: "添加热钱包地址",
    url: "add_hot_address",
    path: "templete",
    sort: 4,
    parentId: "address",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "添加热钱包地址",
    apiList: ["/api/v1/add_hot_address"]
  },{
    id: "asset",
    name: "asset",
    title: "资产管理",
    url: "asset",
    path: "Main",
    sort: 16,
    parentId: "root",
    ico: "logo-usd",
    isOutSide: false,
    showLevel: "2",
    description: "资产管理"
  },{
    id: "assetPage",
    name: "assetPage",
    title: "资产列表",
    url: "asset_page",
    path: "templete",
    sort: 8,
    parentId: "asset",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "资产列表",
    apiList: ["/api/v1/assets", "/api/v1/delete_asset", "/api/v1/update_asset", "/api/v1/create_asset"]
  },{
    id: "assetFlowPage",
    name: "assetFlowPage",
    title: "资产流水",
    url: "asset_flow_page",
    path: "templete",
    sort: 7,
    parentId: "asset",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "资产流水",
    apiList: ["/api/v1/asset_flow", "/api/v1/delete_asset_flow", "/api/v1/update_asset_flow", "/api/v1/create_asset_flow"]
  },{
    id: "assetReport",
    name: "assetReport",
    title: "资产统计",
    url: "asset_report",
    path: "templete",
    sort: 6,
    parentId: "asset",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "资产统计",
    apiList: ["/api/v1/asset_report"]
  },{
    id: "order",
    name: "order",
    title: "订单管理",
    url: "order",
    path: "Main",
    sort: 14,
    parentId: "root",
    ico: "md-reorder",
    isOutSide: false,
    showLevel: "2",
    description: "订单管理"
  },{
    id: "orderFlowReport",
    name: "orderFlowReport",
    title: "订单统计",
    url: "order_flow_report",
    path: "templete",
    sort: 4,
    parentId: "order",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "订单统计",
    apiList: ["/api/v1/order_flows"]
  },{
    id: "depositOrder",
    name: "depositOrder",
    title: "充币订单",
    url: "deposit_order",
    path: "templete",
    sort: 3,
    parentId: "order",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "充币订单",
    apiList: ["/api/v1/orders", "/api/v1/delete_orders", "/api/v1/update_order", "/api/v1/create_contract_deposit_order"]
  },{
    id: "withdrawalOrder",
    name: "withdrawalOrder",
    title: "提币订单",
    url: "withdrawal_order",
    path: "templete",
    sort: 2,
    parentId: "order",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "提币订单",
    apiList: ["/api/v1/orders", "/api/v1/delete_orders", "/api/v1/update_order", "/api/v1/create_asset"]
  },{
    id: "collectOrder",
    name: "collectOrder",
    title: "归集订单",
    url: "collect_order",
    path: "templete",
    sort: 1,
    parentId: "order",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "归集订单",
    apiList: ["/api/v1/orders", "/api/v1/delete_orders", "/api/v1/update_orders"]
  },{
    id: "notifyOrder",
    name: "notifyOrder",
    title: "通知订单",
    url: "notify_order",
    path: "templete",
    sort: 1,
    parentId: "order",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "通知订单",
    apiList: ["/api/v1/notify_order", "/api/v1/delete_notify_order", "/api/v1/update_notify_order", "/api/v1/create_notify_order"]
  },{
    id: "depositBlacklistOrder",
    name: "depositBlacklistOrder",
    title: "黑名单充值订单",
    url: "deposit_blacklist_order",
    path: "templete",
    sort: 1,
    parentId: "order",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "黑名单充值订单",
    apiList: ["/api/v1/blacklist_orders", "/api/v1/delete_orders", "/api/v1/account_blacklist_order", "/api/v1/create_blacklist_deposit_order"]
  },{
    id: "exception",
    name: "exception",
    title: "异常订单处理",
    url: "exception",
    path: "Main",
    sort: 12,
    parentId: "root",
    ico: "md-reorder",
    isOutSide: false,
    showLevel: "2",
    description: "异常订单处理"
  },{
    id: "exceptionWithdrawalOrder",
    name: "exceptionWithdrawalOrder",
    title: "异常订单处理",
    url: "exception_withdrawal_order",
    path: "templete",
    sort: 4,
    parentId: "exception",
    ico: "md-briefcase",
    isOutSide: false,
    showLevel: "1",
    description: "异常订单处理",
    apiList: ["/api/v1/exception_orders", "/api/v1/delete_orders", "/api/v1/resend_orders", "/api/v1/update_order", "/api/v1/create_asset"]
  },{
    id: "redis",
    name: "redis",
    title: "Redis操作",
    url: "redis",
    path: "templete",
    sort: 3,
    parentId: "exception",
    ico: "md-briefcase",
    isOutSide: false,
    showLevel: "1",
    description: "Redis操作",
    apiList: ["/api/v1/redis"]
  },{
    id: "handleWithdrawalOrder",
    name: "handleWithdrawalOrder",
    title: "提现单处理",
    url: "handle_withdrawal_order",
    path: "templete",
    sort: 2,
    parentId: "exception",
    ico: "md-briefcase",
    isOutSide: false,
    showLevel: "1",
    description: "提现单处理",
    apiList: ["/api/v1/withdrawal_order_extra_info", "/api/v1/trans_token"]
  },{
    id: "wallet",
    name: "wallet",
    title: "钱包管理",
    url: "wallet",
    path: "Main",
    sort: 10,
    parentId: "root",
    ico: "md-briefcase",
    isOutSide: false,
    showLevel: "2",
    description: "钱包管理"
  },{
    id: "collectToHot",
    name: "collectToHot",
    title: "归集到运营钱包",
    url: "collect_to_hot",
    path: "templete",
    sort: 4,
    parentId: "wallet",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "归集到运营钱包",
    apiList: ["/api/v1/collect_to_hot", "/api/v1/collect_hot_to_hot"]
  },{
    id: "giveFee",
    name: "giveFee",
    title: "给矿工费",
    url: "give_fee",
    path: "templete",
    sort: 3,
    parentId: "wallet",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "给矿工费",
    apiList: ["/api/v1/give_fee"]
  },{
    id: "walletAdminLog",
    name: "walletAdminLog",
    title: "管理后台日志",
    url: "wallet_admin_log",
    path: "templete",
    sort: 2,
    parentId: "wallet",
    ico: "",
    isOutSide: false,
    showLevel: "1",
    description: "管理后台日志",
    apiList: ["/api/v1/getlogs", "/api/v1/stoplogs"]
  },{
    id: "system",
    name: "system",
    title: "系统设置",
    url: "system",
    path: "Main",
    sort: 8,
    parentId: "root",
    ico: "md-build",
    isOutSide: false,
    showLevel: "1",
    description: "系统设置",
    apiList: ["/api/v1/settings", "/api/v1/update_setting", "/api/v1/create_setting"]
  },{
    id: "auth",
    name: "auth",
    title: "权限设置",
    url: "auth",
    path: "Main",
    sort: 6,
    parentId: "root",
    ico: "ios-people",
    isOutSide: false,
    showLevel: "2",
    description: "权限设置"
  },{
    id: "user",
    name: "user",
    title: "用户管理",
    url: "user",
    path: "template",
    sort: 4,
    parentId: "auth",
    ico: "ios-people",
    isOutSide: false,
    showLevel: "2",
    description: "用户管理",
    apiList: [""]
  },{
    id: "role",
    name: "role",
    title: "角色管理",
    url: "role",
    path: "template",
    sort: 2,
    parentId: "auth",
    ico: "ios-people",
    isOutSide: false,
    showLevel: "2",
    description: "角色管理",
    apiList: [""]
  }
];

export { userList, roleList, menuList, menuLevel };
