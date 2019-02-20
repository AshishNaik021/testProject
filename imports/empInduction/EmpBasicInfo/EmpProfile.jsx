import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';


import { EmpMaster } from '/imports/empInduction/EmpBasicInfo/empMaster.js';
import "./EmpProfile.css";

class EmpProfile extends Component{
	constructor(props){
		super(props);
		var empId = FlowRouter.getParam("empid");

		this.state = {
			"empId"	: empId, 
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

	deleteEmpProfile(event){
		event.preventDefault();
		Meteor.call("deleteEmpProfile",this.state.empId,
								(error,result) => {
									if(error){
										swal("Something is Wrong","Contact Your System Administrator","error");
										console.log(error);
									}else{
										swal("Great!","Delete is Successful!","success");
										FlowRouter.go("/empInfo");
									}
								}
		);
	}

	render(){
		var emp = this.props.allEmp[0];
		if(emp){
			if(emp.dob==""){
				emp.dob = "-- NA --";
			}
		}
		console.log("emp = ",emp);
		

		return (
			<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
			    		<h3> Employee Profile </h3> 
			    	</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
			    		<div id={"del"+this.state.empId} className="actionIcon pull-right" onClick={this.deleteEmpProfile.bind(this)}>
			    			<i className="fa fa-trash"> </i>
			    		</div>

							<a href={"/empInfo/"+this.state.empId} >
				    		<div id={"edit"+this.state.empId} className="actionIcon pull-right">
				    			<i className="fa fa-pencil"> </i>
				    		</div>
				    	</a>
			    	</div>
		    	</div>

		    	<hr className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/>

					<section className="col-lg-12">
						<div className="col-lg-2">	
							<img src="/images/male.png" className="userImg" />
						</div>						
						<div className="col-lg-10">	
							<div className="col-lg-12">	
					    	<div className="col-lg-4 col-md-4 col-sm-6">
					    		<div>First Name</div>
					    		<div>{emp ? emp.firstName : <img src='/images/loading.gif' />}</div>
					    	</div>
					    	<div className="form-group col-lg-4 col-md-4 col-sm-6">
					    		<div>Middle Name</div>
					    		<div>{emp ? emp.middleName : <img src='/images/loading.gif' />}</div>
					    	</div>
					    	<div className="form-group col-lg-4 col-md-4 col-sm-6">
					    		<div>Last Name</div>
					    		<div>{emp ? emp.lastName : <img src='/images/loading.gif' />}</div>
					    	</div>
				    	</div>	

							<div className="col-lg-12">	
					    	<div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
					    		<div>Email</div>
					    		<div>{emp ? emp.email : <img src='/images/loading.gif' />}</div>
					    	</div>
					    	<div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
					    		<div>Phone</div>
					    		<div>{emp ? emp.phone : <img src='/images/loading.gif' />}</div>
					    	</div>
					    	<div className="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12">
					    		<div>DoB</div>
					    		<div>{emp ? emp.dob : <img src='/images/loading.gif' />}</div>
					    	</div>
				    	</div>	
			    	</div>	
					</section>			
		    </div>
		);
	};
}


export default withTracker(()=>{
	var empIdCont = FlowRouter.getParam("empid");
	Meteor.subscribe("empData",empIdCont);

	const oneEmpData = EmpMaster.find({}).fetch();
	console.log("oneEmpData = ",oneEmpData);

	return {
		"allEmp" 			: oneEmpData,
	}
})(EmpProfile);