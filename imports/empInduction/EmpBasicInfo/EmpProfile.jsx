import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';


import { EmpMaster } from '/imports/empInduction/EmpBasicInfo/empMaster.js';


class EmpProfile extends Component{
	constructor(props){
		super(props);
		var empId = FlowRouter.getParam("empid");
		var empData = EmpMaster.findOne({"_id" : empId});
		console.log("empData = ",empData);
		
		this.state = {
			"empId"	: empId, 
			"empData" : empData,
		};		


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

		if(this.state.operation == "edit"){
			Tasks.update({"_id":this.state.taskid},
					{$set: 	{
										"task" : inputTask,
										"createdAt" : new Date(),
									} 
					}
					,(error,result)=>{
						if(error){
							console.log("error = ", error);
						}
						if(result){
							console.log("result = ",result);
							alert("Task Edited Successfully");
							this.setState({"inputValue":"", "operation":"insert","taskid":""});
						}
				});			

		}


	}


	render(){
		console.log("empId = ",this.state.empId);
		var emp = this.props.allEmp[0];
		

		return (
			<div className="row">
		    	<h3> Employee Profile </h3> 
		    	<hr/>

					<section className="col-lg-12">
						<div className="col-lg-12">	
				    	<div className="col-lg-4 col-md-4 col-sm-6">
				    		<div>First Name</div>
				    		<div>{this.state.empData ? this.state.empData.firstName : <img src='/images/loading.gif' />}</div>
				    	</div>
				    	<div className="form-group col-lg-4 col-md-4 col-sm-6">
				    		<label>Middle Name</label>
				    		<div className="input-group">
					    		<span className="input-group-addon"><i className="fa fa-user"></i></span>
					    		<input type="text" ref="middleName" className="form-control" />
					    	</div>
				    	</div>
				    	<div className="form-group col-lg-4 col-md-4 col-sm-6">
				    		<label>Last Name</label>
				    		<div className="input-group">
					    		<span className="input-group-addon"><i className="fa fa-user"></i></span>
					    		<input type="text" ref="lastName" className="form-control" />
					    	</div>
				    	</div>
			    	</div>	

						<div className="col-lg-12">	
				    	<div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
				    		<label>Email</label>
				    		<div className="input-group">
					    		<span className="input-group-addon"><i className="fa fa-envelope"></i></span>
					    		<input type="email" ref="email" className="form-control" />
					    	</div>
				    	</div>
				    	<div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
				    		<label>Phone</label>
				    		<div className="input-group">
					    		<span className="input-group-addon"><i className="fa fa-phone"></i></span>
					    		<input type="phone" ref="phone" className="form-control" />
					    	</div>
				    	</div>
				    	<div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
				    		<label>DoB</label>
				    		<div className="input-group">
					    		<span className="input-group-addon"><i className="fa fa-calendar"></i></span>
					    		<input type="Date" ref="dob" className="form-control" />
					    	</div>
				    	</div>
			    	</div>	



						<div className="col-lg-12">	
							<button className="col-lg-2 btn btn-primary pull-right" onClick={this.submitBasicInfo.bind(this)}> Submit </button>
						</div>		    	
					</section>			
		    </div>
		);
	};
}


export default withTracker(()=>{
	Meteor.subscribe("empData");
	var allEmpData = EmpMaster.find({}).fetch();
	console.log("allEmpData = ",allEmpData);

	return {
		"allEmp" 			: allEmpData,
	}
})(EmpProfile);