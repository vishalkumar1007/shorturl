const appModel = require('../models/appModals');


const handelToGenerateCodeForUrlRedirect = async (req,res)=>{
    try {
        const {userUrl} = req.body;
        
        console.log('server request coming' , userUrl);
        // check for userUrl have data or not , if not then return with status 401
        if( !(userUrl)){
            return res.status(401).json({msg:'userUrl must be requires'});
        }

        // validate the url 
        if(!(userUrl.length>4 && (userUrl.includes('http://')||userUrl.includes('https://')) && userUrl.includes('.'))){
            return res.status(401).json({msg:'given url is not valid'});
        }

        // check already provide url code is exist or not, if exist then send exist code to request user
        const checkForDuplicateData = await appModel.findOne({UserProvidedUrl:userUrl});
        if(checkForDuplicateData){
            return res.status(200).json({msg:'already code exist for this url',url:checkForDuplicateData.UrlByServer})
        }


        // generate random code function
        const generateRandomCode = (size)=>{
            const characters = 'ABCD!E123FGHIJKLab45cdefghijklM67NOPQRSTUVWXYZmnopq890rstuvwxyz';
            let newRandomCode = '';
            for(let i=1;i<=size;i++){
                const randomNumber = Math.round(Math.random()*characters.length);
                newRandomCode += characters[randomNumber];
            }
            return newRandomCode;
        }

        // get new code of url
        const NewUrlCode = generateRandomCode(5);

        // define data model
        const finalUrl = process.env.SERVER_IS_LIVE==='true'?`https://shorturl-snowy.vercel.app/?XCD=${NewUrlCode}`:`http://localhost:8081?XCD=${NewUrlCode}`;
        console.log('live server : ',process.env.SERVER_IS_LIVE);
        console.log('live server url : ',finalUrl);

        
        const userCreateData = {
            assignedCode:NewUrlCode,
            UserProvidedUrl:userUrl,
            UrlByServer:finalUrl,
        }

        // handel to store generated data in mongodb database
        const createNewUrlUser = await appModel.create(userCreateData);

        // if problem to store data then return error msg
        if(!createNewUrlUser){
            return res.status(500).json({msg:'error while generate new url'});
        }

        // send success response with generated new url
        res.status(200).json({url :finalUrl});
        

    } catch (error) {
        console.log('error handelToGenerateCodeForUrlRedirect : ',error)
        res.status(500).json({msg:'internal server error in handelToGenerateCodeForUrlRedirect'});
    }
}


const handelUrlToRedirect = async (req,res)=>{
    try {
        const {XCD} = req.query;

        if(!XCD){
           return res.status(401).json({msg:'code is require to redirect the url'});  
        }

        const findUrlWithCode = await appModel.findOne({assignedCode:XCD});

        if(!findUrlWithCode){
            return res.status(404).json({msg:'provided url is expired or not registered'});
        }

        res.redirect(`${findUrlWithCode.UserProvidedUrl}`);

    } catch (error) {
        console.log('error handelUrlToRedirect : ',error)
        res.status(500).json({msg:'internal server error in handelUrlToRedirect'});
    }
}

module.exports = {handelUrlToRedirect,handelToGenerateCodeForUrlRedirect};