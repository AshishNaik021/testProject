import { Mongo } from 'meteor/mongo';

export const EmpMaster = new Mongo.Collection('empMaster');

if(Meteor.isServer){
	Meteor.publish("empData",function(empid){
		var empprof = EmpMaster.find({"_id":empid});
		return empprof;
	});

	Meteor.publish("allEmpData",function(){
		var allEmp = EmpMaster.find({});
		return allEmp;
	});
}

Meteor.methods({
	"insertBasicInfo" : function(formValues){
		console.log(formValues);

		var emp_id = EmpMaster.insert({
									"firstName" 	: formValues.firstName,
									"middleName" 	: formValues.middleName,
									"lastName" 		: formValues.lastName,
									"email" 			: formValues.email,
									"phone" 			: formValues.phone,
									"dob" 				: formValues.dob,					
								}, 
								(error,result)=>{
									if(error){
										console.log(error);
										return;
									}else{
										console.log(result);
										return;
									}
								}
							);

		return emp_id;
	},	

	"updateBasicInfo" : function(formValues){
		console.log(formValues);

		var emp_id = EmpMaster.update(
								{"_id": formValues._id},
								{$set : {
													"firstName" 	: formValues.firstName,
													"middleName" 	: formValues.middleName,
													"lastName" 		: formValues.lastName,
													"email" 			: formValues.email,
													"phone" 			: formValues.phone,
													"dob" 				: formValues.dob,					
												}
								},
								(error,result)=>{
									if(error){
										console.log(error);
										return;
									}else{
										console.log(result);
										return;
									}
								}
							);

		return emp_id;
	},

	"deleteEmpProfile" : function(empid){
		EmpMaster.remove({"_id":empid}, (error,result)=>{
				if(error){
					return error;
					console.log(error);
				}else{
					return result;
				}
		});

		return;
	}

});