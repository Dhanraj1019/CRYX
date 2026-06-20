import supabase from './Supabase'

class Storage{
  async uploadFile({bucket,file}){
    const result = await supabase.storage.from(bucket).upload(file.name, file)
    if(result && result.error){
          console.log("error = ",result.error);
          return false;
      }
      else {
          return result.data;
      }
  }
  
  async deleteFile({bucket,file}){
    const result = await supabase.storage.from(bucket).remove([file.path, file.fullPath]);
    if(result.error){
      console.log("error = ",result.error);
      return false;
    }
    else{
      return true;
    }
  }

  async getAllFiles({bucket}){
    const result = supabase.storage.from(bucket);
    if(result.error){
      console.log("error in getall files = ",result.error);
      return false;
    }
    return result;
  }
  async getFile({bucket,fileurl}){
    const result = supabase.storage.from(bucket).getPublicUrl(fileurl);
    return result;
  }
}

const StorageObj=new Storage();
export default StorageObj;