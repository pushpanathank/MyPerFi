import React from 'react'
import { Icon } from 'native-base';
import Strings from './Strings';

export default {
  Title: 'PushBase',
  SignInStack : {
    route: 'SignInStack'
  }, 
  DrawerStack : {
    route: 'DrawerStack'
  },
  Home : {
    route: 'Home',
    icon:'home',
    label: Strings.home,
  },
  TransactionManage : {
    route: 'TransactionManage',
  },
  Transactions : {
    route: 'Transactions',
  },
  TopSpend : {
    route: 'TopSpend',
  },
  Categories : {
    route: 'Categories',
    icon:'inbox',
    label: Strings.categories,
  },
  Accounts : {
    route: 'Accounts',
    icon:'accounts',
    label: Strings.accounts,
  },
  AccountsManage : {
    route: 'AccountsManage',
  },
  AccountsTransfer : {
    route: 'AccountsTransfer',
  },
  Bills : {
    route: 'Bills',
    icon:'bill',
    label: Strings.bills,
  },
  BillsManage : {
    route: 'BillsManage',
  },
  Settings : {
    route: 'Settings',
    icon:'settings',
    label: Strings.settings,
  },

  SignOutStack : {
    route: 'SignOutStack'
  }, 
  SignIn : {
    route: 'SignIn'
  }, 
  SignUp : {
    route: 'SignUp'
  }, 
  ForgotPassword : {
    route: 'ForgotPassword'
  }, 
};