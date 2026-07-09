import supabase from './Supabase'

class Storage{
  async uploadFile({bucket,file,path}){
    const result = await supabase.storage.from(bucket).upload(path, file)
    if(result && result.error){
          console.log("error = ",result.error);
          return false;
      }
      else {
          return result.data;
      }
  }
  
  async deleteFile({bucket,path}){
    const result = await supabase.storage.from(bucket).remove([path]);
    if(result.error){
      console.log("error = ",result.error);
      return false;
    }
    else{
      return result;
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

  async getPublicUrl({bucket,path}){
    const { data,error } = await supabase
    .storage
    .from(bucket)
    .getPublicUrl(path)
    if(error){
      console.log("error in getpublicurl function in storage.js",e);
    }
    return data;
  }
}

const StorageObj=new Storage();
export default StorageObj;