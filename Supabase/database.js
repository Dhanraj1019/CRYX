import supabase from './Supabase'

class Database{
    async insertData({table,data}){
        console.log("data in databse.js file = ",data);
        const result=await supabase
                .from(table)
                .insert({...data});
        if(result.error){
            console.log("error ",result.error);
            return false;
        }
        else{
            return result;
        }
    }
    async updateData({table,data,id}){
        const result=await supabase.from(table).update({...data}).eq("id",id)
        if(result.error){
            console.log("error in update in dastabase.js",result.error);
            return false;
        }
        return result;
    }
    async getAllRows({table}){
        const result = await supabase.from(table).select('*');
        return result;
    }

    async getAllMembers({table,role="member"}){
        const result = await supabase.from(table).select("*").eq("role",role)
    }

    async getRow({bucket,chake}){
        const result = (await supabase.from(bucket).select("*").eq(chake[0],chake[1]))
        if(result.error){
            console.log("error during getrow in database.js ",result.error);
        }
        return result.data[0];
    }

    async deleteRow({bucket,id}){
        const result = await supabase.from(bucket).delete().eq("id",id);
        if(result.error){
            console.log("error during delete row in databse.js",result.error);
            return false;
        }
        console.log("user deleted");
        return true;
    }
}
const DatabaseObj=new Database();
export default DatabaseObj;