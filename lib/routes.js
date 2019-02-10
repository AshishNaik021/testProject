import React, {Component} from 'react';
import { mount } from 'react-mounter';

import {AuthLayout} from '/imports/layouts/authLayout.jsx';
import EmpBasicInfo from "/imports/empInduction/EmpBasicInfo/EmpBasicInfo.jsx";
import EmpProfile from "/imports/empInduction/EmpBasicInfo/EmpProfile.jsx";


FlowRouter.route('/empInfo', {
    action: function() {
        mount(AuthLayout,{main: (<EmpBasicInfo />)});
    }
});

FlowRouter.route('/empProfile/:empid', {
    action: function() {
        mount(AuthLayout,{main: (<EmpProfile />)});
    }
});