import supabase from './Supabase.js';

class Auth{
    async signup({email,password}){
        try{
            const result=await supabase.auth.signUp({
                email,
                password
            })
            if(result && result.error){
                console.log("error in signup function = ",result.error);
                return false;
            }
            this.signIn({email,password})
            return result.data;
        }catch(e){
            console.log("error in signup function = ",e);
            return false;
        }
    }
    async signOut(){
        try{
            const result = await supabase.auth.signOut({scope:"local"})
            if(result.error){
                return false;
            }
            return true;
        }catch(e){
            console.log("error in signout function = ",e)
            return false;
        }
    }
    async signIn({email,password}){
        try{
            const result= await supabase.auth.signInWithPassword({
                email:email,
                password:password
            })
            if(result && result.error){
                console.log("error in login function = ",result.error);
                return false;
            }
            return result;
        }catch(e){
            console.log("error in signin function = ",e);
            return false;
        }
    }

    async saveProfile({data}){
        try{
            const id_data=await this.signup({email:data.email,password:data.password});
            console.log("id_data in auth.js = ",id_data);
            if(id_data && id_data.user){
                const result=await supabase
                .from('userprofile')
                .insert({phone:data.phone, email:data.email,username:data.username,instagramid:data.instagramid?.trim() || null,linkdinid:data.linkdinid?.trim() || null,id:id_data.user.id,firstName:data.firstName,lastName:data.lastName })
                if(result && result.error){
                    console.log("error during profile save = ",result.error);
                    return false;
                }
                console.log("data save in profile table : ",result);
                return true;
            }
            else{
                console.log("id_data.user not find in auth.js file");
                return false;
            }
        }catch(e){
            console.log("error during profile save = ",e);
            return false;
        }
    }

    // async getCurrentStatus(){
    //     const 
    // }


}

const AuthObj=new Auth();

export default AuthObj