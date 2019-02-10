import { Mongo } from 'meteor/mongo';

export const EmpMaster = new Mongo.Collection('empMaster');

if(Meteor.isServer){
	Meteor.publish("empData",function(){
		var empprof = EmpMaster.find({});
		return empprof;
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
	}
});