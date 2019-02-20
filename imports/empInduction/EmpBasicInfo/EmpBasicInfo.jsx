import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';


import { EmpMaster } from '/imports/empInduction/EmpBasicInfo/empMaster.js';


class EmpBasicInfo extends Component{
	constructor(props){
		super(props);
		var urlEmpId = FlowRouter.getParam("empid");
		if(urlEmpId){
			var action = "Update";
		}else{
			var action = "Submit";
		}


		this.state = {
			"empId" : urlEmpId,
			"action" : action,
			"firstName": "",
			"middleName": "",
			"lastName": "",
			"email": "",
			"phone": "",
			"dob": "",
		};		

	}

  componentWillReceiveProps(nextProps) {
  	if(!nextProps.loading){
      if(nextProps.oneEmpData){
		    this.setState({
		        "firstName" 	: nextProps.oneEmpData.firstName,	        
		        "middleName" 	: nextProps.oneEmpData.middleName,	        
		        "lastName" 		: nextProps.oneEmpData.lastName,	        
		        "email" 			: nextProps.oneEmpData.email,	        
		        "phone" 			: nextProps.oneEmpData.phone,	        
		        "dob" 				: nextProps.oneEmpData.dob,	        
		    });
		  }
		}
	}


	submitBasicInfo(event){
		event.preventDefault();
		var formValues = {
			firstName 	: this.refs.firstName.value,
			middleName 	: this.refs.middleName.value,
			lastName 		: this.refs.lastName.value,
			email 			: this.refs.email.value,
			phone 			: this.refs.phone.value,
			dob 				: this.refs.dob.value,		
		};

		if(this.state.action == "Submit"){
				Meteor.call("insertBasicInfo",formValues,
											(error,result)=>{
												if(error){
													console.log("Something went wrong! Error = ", error);
												}else{
													swal("Congrats!","Your Information Submitted Successfully.","success");
													console.log("latest id = ",result);
													FlowRouter.go("/empProfile/"+result);
													// this.setState({"inputValue":""});
												}
											});	
		}else{
			formValues._id = this.state.empId;
			Meteor.call("updateBasicInfo",formValues,
										(error,result)=>{
											if(error){
												console.log("Something went wrong! Error = ", error);
											}else{
												swal("Congrats!","Employee Profile Updated Successfully.","success");
												console.log("latest id = ",result);
												FlowRouter.go("/empProfile/"+this.state.empId);
											}
										});	
		}

	}

	handleChange(event){
		event.preventDefault();
    this.setState({
        "firstName" 	: this.refs.firstName.value,	        
        "middleName" 	: this.refs.middleName.value,	        
        "lastName" 		: this.refs.lastName.value,	        
        "email" 			: this.refs.email.value,	        
        "phone" 			: this.refs.phone.value,	        
        "dob" 				: this.refs.dob.value,	        
    });

	}


	render(){
		// console.log(this.props.oneEmpData[0]);
		var emp = this.props.oneEmpData[0];

		return (
			<div className="row">
		    	<h3> Employee Basic Info </h3> 
		    	<hr/>

					<form className="col-lg-12">
						<div className="col-lg-12">	
				    	<div className="form-group col-lg-4 col-md-4 col-sm-6">
				    		<label>First Name</label>
				    		<div className="input-group">
					    		<span className="input-group-addon"><i className="fa fa-user"></i></span>
					    		<input type="text" value={this.state.firstName} ref="firstName" className="form-control" onChange={this.handleChange.bind(this)} />
					    	</div>
				    	</div>
				    	<div className="form-group col-lg-4 col-md-4 col-sm-6">
				    		<label>Middle Name</label>
				    		<div className="input-group">
					    		<span className="input-group-addon"><i className="fa fa-user"></i></span>
					    		<input type="text" value={this.state.middleName} ref="middleName" className="form-control" onChange={this.handleChange.bind(this)}  />
					    	</div>
				    	</div>
				    	<div className="form-group col-lg-4 col-md-4 col-sm-6">
				    		<label>Last Name</label>
				    		<div className="input-group">
					    		<span className="input-group-addon"><i className="fa fa-user"></i></span>
					    		<input type="text" value={this.state.lastName} ref="lastName" className="form-control"  onChange={this.handleChange.bind(this)} />
					    	</div>
				    	</div>
			    	</div>	

						<div className="col-lg-12">	
				    	<div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
				    		<label>Email</label>
				    		<div className="input-group">
					    		<span className="input-group-addon"><i className="fa fa-envelope"></i></span>
					    		<input type="email" value={this.state.email} ref="email" className="form-control"  onChange={this.handleChange.bind(this)} />
					    	</div>
				    	</div>
				    	<div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
				    		<label>Phone</label>
				    		<div className="input-group">
					    		<span className="input-group-addon"><i className="fa fa-phone"></i></span>
					    		<input type="phone" value={this.state.phone} ref="phone" className="form-control"  onChange={this.handleChange.bind(this)} />
					    	</div>
				    	</div>
				    	<div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
				    		<label>DoB</label>
				    		<div className="input-group">
					    		<span className="input-group-addon"><i className="fa fa-calendar"></i></span>
					    		<input type="Date" value={this.state.dob} ref="dob" className="form-control"  onChange={this.handleChange.bind(this)} />
					    	</div>
				    	</div>
			    	</div>	



						<div className="col-lg-12">	
							<button className="col-lg-2 btn btn-primary pull-right" onClick={this.submitBasicInfo.bind(this)}> {this.state.action} </button>
						</div>		    	
					</form>			
		    </div>
		);
	};
}


export default withTracker(()=>{
	if(FlowRouter.getParam("empid")){
		var urlEmpId = FlowRouter.getParam("empid");
	}else{
		var urlEmpId = 0;
	}
	var empSub = Meteor.subscribe("empData",urlEmpId);

	const oneEmpData = EmpMaster.findOne({})||{};
	// console.log("oneEmpData = ",oneEmpData);

	return {
		"loading" : !empSub.ready(),
		"oneEmpData" 	: oneEmpData,
	}

})(EmpBasicInfo);