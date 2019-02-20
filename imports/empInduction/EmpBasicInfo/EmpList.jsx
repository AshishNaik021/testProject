import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Printd } from 'printd';
import ReactTable from "react-table";

import { EmpMaster } from '/imports/empInduction/EmpBasicInfo/empMaster.js';
import "./EmpProfile.css";
import "../node_modules/react-table/react-table.css";

class EmpList extends Component{
	constructor(props){
		super(props);
		this.state = {
		};		


	}


	deleteRecord(event){
		event.preventDefault();
		var empId = event.currentTarget.id;

		swal({
		  title: "Are you sure you want to delete?",
		  text: "Once deleted, you will not be able to recover this record!",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
				Meteor.call("deleteEmpProfile",empId,
										(error,result) => {
											if(error){
												swal("Something is Wrong","Contact Your System Administrator","error");
												console.log(error);
											}else{
												swal("Great!","Delete is Successful!","success");
												// FlowRouter.go("/empInfo");
											}
										}
				);
		  } else {
		    swal("This record is safe!");
		  }
		});
	}

	printTable(){
		const cssText = 'table{ border: 1px solid #333; }';

		const d: Printd = new Printd();
		d.print( document.getElementById('empListTable',cssText) );
	}

	render(){		

		return (
			<div className="row">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					
						<div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
			    		<h3> Employee List </h3> 
			    	</div>
						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
			    		<div className="actionIcon pull-right" onClick={this.deleteRecord.bind(this)}>
			    			<i className="fa fa-plus"> </i>
			    		</div>

			    		<div id="print" className="actionIcon pull-right" onClick={this.printTable.bind(this)}>
			    			<i className="fa fa-print"> </i>
			    		</div>

							<a href={"/empInfo/"+this.state.empId} >
				    		<div id={"download"+this.state.empId} className="actionIcon pull-right">
				    			<i className="fa fa-download"> </i>
				    		</div>
				    	</a>
			    	</div>

					<table id="empListTable" className="table table-bordered table-hovered table-striped">
						<thead>
							<tr> 
								<th> Sr </th> 
								<th> Employee Name </th> 
								<th> Email </th> 
								<th> Phone </th> 
								<th> DOB</th>
								<th> Action</th>
							</tr>
						</thead>

						<tbody>
							{	this.props.allEmp.map( (emp,index)=>{
									return(
										<tr key={index}>
											<td> {index+1} </td>
											<td> {emp.firstName} {emp.middleName} {emp.lastName} </td>
											<td> {emp.phone} </td>
											<td> {emp.email} </td>
											<td> {emp.dob} </td>
											<td>
													<a href={"/empInfo/"+emp._id}>
														<i className="actionIcon fa fa-pencil"></i>
													</a>
													<i id={emp._id} className="actionIcon fa fa-trash" onClick={this.deleteRecord.bind(this)}></i>
											</td>
										</tr>
									);
								})
							}
						</tbody>

					</table>
			  </div>	
		  </div>
		);
	};
}


export default withTracker(()=>{
	const empSubHandle = Meteor.subscribe("allEmpData");
	const allEmpData = EmpMaster.find({}).fetch()||[{}];

	return {
		"loading"		: !empSubHandle.ready(),
		"allEmp" 		: allEmpData,
	}
})(EmpList);