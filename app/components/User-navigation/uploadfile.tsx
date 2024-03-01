
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import Button from './Button';
import dbConnect from '@/lib/db-connect';
import UserModel from '@/lib/user-model'
import { getServerSession } from 'next-auth';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


interface CloudinaryResource {
  context?: {
    alt?: string;
    caption?: string;
  };
  public_id: string;
  secure_url: string;

}

async function Upload({users}:{users:any}) {
  async function create(formData: FormData) {
    'use server'
    const file = formData.get('image') as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        tags: ['nextjs-server-actions-upload-sneakers']
      }, async function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
        
        const session = await getServerSession();

        try {
            await dbConnect();
        
            const existingUser = await UserModel.findOne({ email: session?.user?.email });
        
            if (!existingUser) {
                return { message: 'User not found' };
            }
                    
            if (result?.secure_url) {
                existingUser.image = result.secure_url;
            }
            
            // Save the updated user
            await existingUser.save();
           
            return { message: 'User updated successfully', user: JSON.parse(JSON.stringify(existingUser)) };
        } catch (e) {
            console.error(e);
            return { message: 'Failed to update user' };
        }
        
      })
      .end(buffer);
    });
    revalidatePath('/')
  }
  
  
  return (
    <>
      <h2 className="text-l font-bold mb-2">Change avatar image</h2>
      <form action={create} className="bg-base-200 border border-slate-200 rounded-md p-6 mb-6 mx-2" >
        <p className="mb-6">
          <label htmlFor="image" className="block font-semibold text-sm mb-2">
            Select an Image to Upload
          </label>
          <input
            id="image"
            className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="file"
            name="image"
            required  
            
          />
        </p>
        <Button users={users} >Submit</Button>
      </form>
      
       
      
      
      </>

      
    
  )
}

export default Upload;
