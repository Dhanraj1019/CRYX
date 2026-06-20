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
    }
    async getAllRows({table}){
        const result = await supabase.from(table).select('*');
        return result;
    }

    async getAllMembers({table,role="member"}){
        const result = await supabase.from(table).select("*").eq("role",role)
    }
}
const DatabaseObj=new Database();
export default DatabaseObj;