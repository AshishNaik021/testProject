import React, {Component} from 'react';
import {render} from 'react-dom';

import '/lib/routes.js';
import EmpBasicInfo from '/imports/empInduction/EmpBasicInfo/EmpBasicInfo.jsx';

Meteor.startup(()=>{
	// render(<EmpBasicInfo />, document.getElementById('render-target'));	
});
