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
  TransactionAdd : {
    route: 'TransactionAdd',
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