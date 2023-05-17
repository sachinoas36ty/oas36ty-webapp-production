var cc ;
var bcc ;
var ccaddress = 'mailto:robin@yopmail.com';
var to_email = 'mailto:robinoas@gmail.com';
var to_reply_all = 'mailto:robinoas@gmail.com';
if(INBOX){
    if(ccaddress || to_reply_all){
        if(to_email != ccaddress && to_email != to_reply_all){ // != not exists
            if(ccaddress && to_reply_all){
                cc = ccaddress+ to_reply_all;
            }else if(ccaddress){
                cc = ccaddress;
            }
            else if(to_reply_all){
                cc = to_reply_all;
            }else{
                cc = '';
            }
        }else {
            
            if(to_email == ccaddress){ // == exists
            ccaddress = ccaddress-to_email;
           }
           if(to_email == to_reply_all){
            to_reply_all = to_reply_all-to_email;
           }
           if(ccaddress && to_reply_all){
            cc = ccaddress+ to_reply_all;
            }else if(ccaddress){
                cc = ccaddress;
            }
            else if(to_reply_all){
                cc = to_reply_all;
            }else{
                cc = '';
            }
        }
    }
}

