module.exports = function(app, sfcon) {
    const formidable = require('formidable');
    const fs = require('fs');
    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // frontend routes =========================================================
    // route to handle all angular requests
    debugger;

    let appId = '';
    let testVar = 'Kishan';
    app.get('/view/*', function(req, res) {
        res.sendfile('./public/index.html');
        //res.sendfile('./public/views/Signin.html');
    });


    app.get('/api/getAllAccounts', async function(req, res, next) {
        try {
            var records = [];
            await sfcon.query("SELECT Id,Name,BillingCity,Industry,Phone,Account_Score__c,Branch_Name__c,City__c,Customer_Email__c,Overall_Exposure__c FROM Account WHERE id='0011s00000hhyhu'", function(err, result) {
                if (err) { return console.error(err); }
                console.log("total : " + result.totalSize);
                console.log("fetched : " + result.records.length);
                for (var i = 0; i < result.records.length; i++) {
                    console.log("total : " + result.records[i].Name);
                }
                console.log('response'+JSON.stringify(result));
                res.send(JSON.stringify(result.records));
            });
        } catch (err) {
            next(err);
        }
        //res.send(JSON.stringify(result.records));
        //res.send('asdf');
        //res.send(JSON.stringify({ value: 1 }));
    });

    app.post('/api/getAccountDetails',async function(req, res, next){
        try{
            
            await sfcon.query("SELECT id,name,Customer_Identification__c,Password__c,Pan_Number__c,Date_of_birth__c,Gender__c,Phone,Customer_Email__c,Marital_Status__c,BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry FROM Account"+ " WHERE id ='" +req.body.id+"'",function(err,result){
                if(err){return console.log(err);}
                console.log('total size::'+result.totalSize);
                console.log('total lenght::'+result.records.length);
                for(var i=0;i<result.records.length;i++){
                    console.log('total::'+result.records[i]);
                }
                res.send(JSON.stringify(result.records));
            });
        }catch(err){
            next(err);
        }
    });

    app.post('/api/getCustomerDetails',async function(req, res, next){
        try{
            var records = [];
            
            await sfcon.query("SELECT id,name,Pan_Number__c,Date_of_birth__c,Gender__c,Phone,Customer_Email__c,Marital_Status__c,BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry FROM Account"+ " WHERE id ='" +req.body.id+"'",function(err,result){
                if(err){return console.log(err);}
                console.log('total size::'+result.totalSize);
                console.log('total lenght::'+result.records.length);
                for(var i=0;i<result.records.length;i++){
                    console.log('total::'+result.records[i]);
                }
                res.send(JSON.stringify(result.records));
            });
        }catch(err){
            next(err);
        }
    });

    app.post('/api/verifySignin',async function(req, res, next){
        try{
            var records = [];
            console.log('request::'+JSON.stringify(req.body));
            
            await sfcon.query("SELECT id,name,Customer_Identification__c,Password__c FROM Account"+ " WHERE Customer_Identification__c ='" +req.body.Customer_Identification__c+"'" +"AND Password__c ='"+ req.body.Password__c+"'",function(err,result){
                if(err){return console.log(err);}
                console.log('total size::'+result.totalSize);
                console.log('total lenght::'+result.records.length);
                for(var i=0;i<result.records.length;i++){
                    console.log('total::'+result.records[i]);
                }
                res.send(JSON.stringify(result.records));
            });
        }catch(err){
            next(err);
        }
    });

    app.get('/api/getApplicationsFromAccount',async function(req, res, next){
        try{
            var records = [];
            
            await sfcon.query("SELECT id FROM Application__c WHERE Account__c = '0012v00003BVOm8'",function(err,result){
                if(err){return console.log(err);}
                console.log('total size::'+result.totalSize);
                console.log('total lenght::'+result.records.length);
                for(var i=0;i<result.records.length;i++){
                    console.log('total::'+result.records[i]);
                }
                res.send(JSON.stringify(result.records));
            });
        }catch(err){
            next(err);
        }
    });
    app.post('/api/getPartiesFromAccount',async function(req, res, next){
        try{
            var records = [];
            console.log('requestbody'+JSON.stringify(req.body));
            await sfcon.query("SELECT id,Name,MobilePhone,firstname,lastname,Cibil__c,Email,Phone FROM contact WHERE AccountId  ='" +req.body.id+"'",function(err,result){
                if(err){return console.log(err);}
                res.send(JSON.stringify(result.records));
            });
        }catch(err){
            next(err);
        }
    });
    app.post('/api/getApplicationDetails',async function(req, res, next){
        try{
            await sfcon.query("SELECT id,Name,Status__c,Loan_Amount__c,Requested_Term__c ,Product__r.name,Application_Stage__c FROM Application__c WHERE Account__c = '" +req.body.id+"'",function(err,result){
                if(err){return console.log(err);}
                res.send(JSON.stringify(result.records));
                //return result;
            });
        }catch(err){
            next(err);
        }
    });

    app.post('/api/getnewApplicationDetails',async function(req, res, next){
        try{
            await sfcon.query("SELECT id,Name,Status__c,Loan_Amount__c,Requested_Term__c ,Product__r.name,Application_Stage__c FROM Application__c WHERE id = '" +req.body.id+"'",function(err,result){
                if(err){return console.log(err);}
                res.send(JSON.stringify(result.records));
                //return result;
            });
        }catch(err){
            next(err);
        }
    });

    app.post('/api/getAllCollateralFromAccount',async function(req, res, next){
        try{
            var records = [];
            
            await sfcon.query("SELECT id,Name,Account__c,Status__c,Collateral_Category__c,Collateral_Type__c,Market_Valuation__c,Coverage_Remaining__c,Coverage_Used__c FROM Collateral__c WHERE Account__c = '" +req.body.id+"'",function(err,result){
                if(err){return console.log(err);}
                res.send(JSON.stringify(result.records));
            });
        }catch(err){
            next(err);
        }
    });

    app.get('/api/getPartiesCollFromApp',async function(req,res,next){
        try{
            var records = [];
             await sfcon.query("SELECT id,(SELECT id,Util_Application__c,Party_Type__c,Share_Percentage__c from Key_Parties__r),(SELECT id from Application_Collaterals__r)FROM Application__c where id = 'a0I2v000019yrBL'",function(err,result){
            if(err){return console.log(err);}
            console.log('total size::'+result.totalSize);
                console.log('total lenght::'+result.records.length);
                for(var i=0;i<result.records.length;i++){
                    console.log('total::'+result.records[i]);
                }
                res.send(JSON.stringify(result.records));
        })
        }catch(err){
            next(err);
        }
        
        
    });

    app.get('/api/getAllProducts', async function(req, res, next) {
        try {
            var records = [];
            await sfcon.query("SELECT Id,Name FROM Product__c", function(err, result) {
                if (err) { return console.error(err); }
                console.log("total : " + result.totalSize);
                console.log("fetched : " + result.records.length);
                for (var i = 0; i < result.records.length; i++) {
                    console.log("total : " + result.records[i].Name);
                }
                console.log('response'+JSON.stringify(result));
                res.send(JSON.stringify(result.records));
            });
        } catch (err) {
            next(err);
        }
        //res.send(JSON.stringify(result.records));
        //res.send('asdf');
        //res.send(JSON.stringify({ value: 1 }));
    });

    app.get('/api/getRetailProducts', async function(req, res, next) {
        try {
            var records = [];
            await sfcon.query("SELECT Id,Name,Maximum_Amount__c FROM Product__c WHERE Category__c = 'Retail' ", function(err, result) {
                if (err) { return console.error(err); }
                console.log("total : " + result.totalSize);
                console.log("fetched : " + result.records.length);
                for (var i = 0; i < result.records.length; i++) {
                    console.log("total : " + result.records[i].Name);
                }
                console.log('response'+JSON.stringify(result));
                res.send(JSON.stringify(result.records));
            });
        } catch (err) {
            next(err);
        }
        //res.send(JSON.stringify(result.records));
        //res.send('asdf');
        //res.send(JSON.stringify({ value: 1 }));
    });

    app.get('/api/getAllLegalEntity', async function(req, res, next) {
        try {
            var records = [];
            await sfcon.query("SELECT Id,Name FROM Legal_Entity__c", function(err, result) {
                if (err) { return console.error(err); }
                console.log("total : " + result.totalSize);
                console.log("fetched : " + result.records.length);
                for (var i = 0; i < result.records.length; i++) {
                    console.log("total : " + result.records[i].Name);
                }
                console.log('response'+JSON.stringify(result));
                res.send(JSON.stringify(result.records));
            });
        } catch (err) {
            next(err);
        }
        //res.send(JSON.stringify(result.records));
        //res.send('asdf');
        //res.send(JSON.stringify({ value: 1 }));
    });

    app.post('/api/getDocumentCategory', async function(req, res, next) {
        try {
            var records = [];
            console.log('reqquest body::'+req.body)
            appId = req.body.parentId;
            await sfcon.query("SELECT Id,Name,Document_Uploaded__c,Application_Document_Category__c,Attachment_ID__c,Application__c,Document_Category__r.Incoming_Document__c FROM Application_Document_Category__c WHERE Document_Category__r.Incoming_Document__c = true and Application__c ='" +req.body.parentId+"'", function(err, result) {
                if (err) { return console.error(err); }
                console.log("total : " + result.totalSize);
                console.log("fetched : " + result.records.length);
                for (var i = 0; i < result.records.length; i++) {
                    console.log("total : " + result.records[i].Name);
                }
                console.log('response'+JSON.stringify(result));
                res.send(JSON.stringify(result.records));
            });
        } catch (err) {
            next(err);
        }
        //res.send(JSON.stringify(result.records));
        //res.send('asdf');
        //res.send(JSON.stringify({ value: 1 }));
    });
    app.post('/api/createAccount',async function(req,res,next){
        try{
            console.log('err::'+JSON.stringify(req.body));
           await sfcon.sobject('Account').create([req.body]
            ,function(err,response){
                if(err){
                    console.log('err::'+err)
                    return console.log(err)
                }
                console.log('response'+JSON.stringify(response))
                res.send(JSON.stringify(response));
            })

        }catch(err){
            console.log(err);
            next(err);
        }
    });

    app.post('/api/createContact',async function(req,res,next){
        try{
            console.log('reqbody::'+JSON.stringify(req.body));
           await sfcon.sobject('contact').create([
            req.body
            ],function(err,response){
                if(err){return console.log(err)}
                console.log('response'+response)
                res.send(JSON.stringify(response));
            })

        }catch(err){
            console.log(err);
            next(err);
        }
    });

    app.post('/api/createApplication',async function(req,res,next){
        try{
            debugger;
            console.log('req::'+JSON.stringify(req.body));
            await sfcon.sobject('Application__c').create([req.body
            ],function(err,response){
                if(err){return console.log(err)}
                console.log('response'+JSON.stringify(response));
                res.send(JSON.stringify(response));
            })
        }catch(err){
            console.log('eror');
            next(err);
        }
    });

    app.post('/api/createParties',async function(req,res,next){
        try{
            console.log('req.body caretaparty ::'+req.body );
            console.log('req::'+JSON.stringify(req.body));
            await sfcon.sobject('Key_Party__c').create(req.body
                ,function(err,response){
                if(err){
                    console.log('err:'+err)
                    return console.log(err)}
                console.log('response'+response)
                res.send(JSON.stringify(response));
            })
        }catch(err){
            console.log('err in parties creation::'+err);
            next(err);
        }
    });

    app.post('/api/createCollateral',async function(req,res,next){
        try{
            await sfcon.sobject('Collateral__c').create([req.body]
                ,function(err,response){
                if(err){console.log('err::'+err);
                    return console.log(err)}
                console.log('response'+response)
                res.send(JSON.stringify(response.records));
            })
            
        }catch(err){
            next(err);
        }
    });

    app.post('/api/updateAccount',async function(req,res,next){
        try{
            console.log('req.body::'+JSON.stringify(req.body));
            await sfcon.sobject('Account').update(req.body,function(err,response){
                if(err){
                    console.log('err'+err);
                    return console.log(err)
                }
                console.log('response'+JSON.stringify(response))
                res.send(JSON.stringify(response));
            })

            
        }catch(err){
            next(err);
        }
    });

    app.post('/api/updateApplication',async function(req,res,next){
        try{
           await sfcon.sobject('Application__c').update([
                {Id :'a0I2v000019yrBL',
                Name :'Updated Account #1'
            }],function(err,response){
                if(err){return console.log(err)}
                console.log('response'+response)
                res.send(JSON.stringify(response.records));
            })

            
        }catch(err){
            next(err);
        }
    });

    app.post('/api/updatePartyrecord',async function(req,res,next){
        try{
           await sfcon.sobject('Key_Party__c').update([
                {Id :'a0J2v00001AVyr0',
                Name :'Updated Account #1'
            }],function(err,response){
                if(err){return console.log(err)}
                console.log('response'+response)
                res.send(JSON.stringify(response.records));
            })

            
        }catch(err){
            next(err);
        }
    });

    app.post('/api/createAppcollateral',async function(req,res,next){
        try{
           await sfcon.sobject('Application_Collateral__c').create(req.body
               ,function(err,response){
                if(err){return console.log(err)}
                console.log('response'+response)
                res.send(JSON.stringify(response.records));
            })

            
        }catch(err){
            next(err);
        }
    });

    app.post('/api/uploadAttachment',async function(req,res,next){
        debugger;
        
        try{
           
            console.log('req.body::'+JSON.stringify(req.body));
            sfcon.apex.post("/uploadAttachment/",req.body,function(response,err){
                if (err) { return console.error(err); }
                console.log("response: ", res);
                res.send(JSON.stringify(response.records));
            })
        }catch(err){
            next(err);
        }
    });
    
    app.post('/api/getOffers',async function(req,res,next){
        debugger;
        
        try{
           
            console.log('req.body::'+JSON.stringify(req.body));
            sfcon.apex.post("/getOffers/",req.body,function(err,response){
                if (err) {
                    console.log('err:'+JSON.stringify(err));
                     return console.error(err); 
                    }
                res.send(JSON.stringify(response));
            })
        }catch(err){
            next(err);
        }
    });

    app.post('/api/createBankDetailRecord',async function(req,res,next){
        try{
            await sfcon.sobject('Bank_Details__c').create([req.body]
                ,function(err,response){
                if(err){console.log('err::'+err);
                    return console.log(err)}
                console.log('response1:::'+JSON.stringify(response))
                res.send(JSON.stringify(response));
            })
            
        }catch(err){
            next(err);
        }
    });

    app.post('/api/createIncomeDetailRecord',async function(req,res,next){
        try{
            await sfcon.sobject('Income_Details__c').create([req.body]
                ,function(err,response){
                if(err){console.log('err::'+err);
                    return console.log(err)}
                    console.log('response1:::'+JSON.stringify(response))
                res.send(JSON.stringify(response));
            })
            
        }catch(err){
            next(err);
        }
    });

    app.post('/api/createEmploymentDetailRecord',async function(req,res,next){
        try{
            await sfcon.sobject('Employment_Details__c').create([req.body]
                ,function(err,response){
                if(err){console.log('err::'+err);
                    return console.log(err)}
                    console.log('response1:::'+JSON.stringify(response))
                res.send(JSON.stringify(response));
            })
            
        }catch(err){
            next(err);
        }
    });

    app.post('/api/createFacilityDetailRecord',async function(req,res,next){
        try{
            await sfcon.sobject('Facility__c').create([req.body]
                ,function(err,response){
                if(err){console.log('err::'+err);
                    return console.log(err)}
                console.log('response1:::'+JSON.stringify(response))
                res.send(JSON.stringify(response));
            })
            
        }catch(err){
            next(err);
        }
    });

    app.post('/view/uploadDocument',async function(req,res,next){
        console.log('inside api::'+JSON.stringify(req.body.documentId))
        console.log('apploicationid::'+ appId);
        var fileOnServer =   '';
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if(err){
                console.log('errorr::'+err);
            }
            console.log('fields::',fields.documentId)
            fileOnServer = files;
            let currentFilePath = files.thisfile.path;
            let filenAME = files.thisfile.name;
            let fileType = files.thisfile.type;
            let parentId = fields.documentId;
            let accId = fields.accId;
            let rawData = fs.readFileSync(currentFilePath, { encoding: 'base64' })
            sfcon.sobject('Attachment').create({ 
                    ParentId: parentId,
                    Name : filenAME,
                    Body: rawData,
                    ContentType : fileType,  
                }, 
                function(err, uploadedAttachment) {
                    if(uploadedAttachment.success){
                        console.log('success::'+uploadedAttachment.id);
                            try{
                                 sfcon.sobject('Application_Document_Attachment__c').create({
                                    Application__c :appId,
                                    Application_Document_Category__c :parentId,
                                    Attachment_ID__c :uploadedAttachment.id,
                                    File_Location__c :'SF ATTACHMENT'
                                },function(err,response){
                                    if(err){console.log('err::'+err);
                                        return console.log(err)}
                                })

                                sfcon.sobject("Application_Document_Category__c").update({ 
                                    Document_Uploaded__c : true,
                                    Id : parentId
                                  }, function(err, ret) {
                                    if (err || !ret.success) { return console.error(err, ret); }
                                    console.log('Updated Successfully : ' + ret.id);
                                    // ...
                                  });
                            
                            }catch(err){
                            next(err);
                            }
                            res.writeHead(301, {
                                'Location': '/view/Document/'+accId+'/application/'+appId
                                //add other headers here...
                              });
                            res.end('Success');
                    }
                });
            
          });
   
    });

};