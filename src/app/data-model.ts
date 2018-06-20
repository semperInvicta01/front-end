export class DataModel {
}

export class company{
    id=0;
    companyName='';
    companyEmail='';
    dateSubmitted='';
    status='';
    branches : branchCompany[];
    username='';
}

export class branchCompany{
    branchName='';
    officeAddress='';
    lat=0;
    lng=0;
    branchType=true;
    fullName='';
    contactPersonNumber=0;
    contactPersonEmailAd='';
}

export class contactPerson{
   fullName='';
   contactNum=0;
   email='';
}

export const companies:company=
    {
        id:1,
        companyName:'',
        companyEmail:'',
        dateSubmitted:'',
        username:'',
        status:'NOT ACCEPTED',
        branches:[
            {branchName:'',officeAddress:'',lat:0,lng:0,branchType:true,fullName:'',contactPersonNumber:0,contactPersonEmailAd:''}
        ]
    }


export const types = ['MAIN','SUB'];