"use server"
import UserModel from './user-model'
import ProductModel from './product-model'
import TaskModel from './task-model'
import dbConnect from './db-connect'
import { z } from 'zod'
import bcryptjs from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth'
import Task from './task-model'



export async function createUser(prevState: any, formData: FormData) {
    const schema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        cpassword: z.string().min(6),
    })
    const parse = schema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        cpassword: formData.get('cpassword'),
    })
    if (!parse.success) {
        console.log(parse.error)
        return { message: 'Form data is not valid' }
    }
    const data = parse.data
    try {
        await dbConnect();
        const existingUser = await UserModel.findOne({ email: data.email });
        if (existingUser) {
            return { message: 'User already exist' }
        }
        const hashedPassword = bcryptjs.hash(data.password, 10);

        const newUser = new UserModel({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            avatar: 'https://res.cloudinary.com/dps8xubee/image/upload/v1684105438/avatar/pmbgserj2nobgqn2auwr.png',
            isAdmin: false,
        });
        const user: any = await newUser.save();
        revalidatePath('/')

        return ({
            message: 'User created successfully!',
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } catch (e) {
        return { message: 'Failed to register' }
    }
}

//UPDATE USER

export async function updateUser(prevState: any, formData: FormData) {
    const schema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        address: z.string().min(6),
        city: z.string().min(2),
        postal: z.string().min(4),
        country: z.string().min(6)
    });

    const parse = schema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        address: formData.get('address'),
        city: formData.get('city'),
        postal: formData.get('postal'),
        country: formData.get('country')
    });

    if (!parse.success) {
        console.log(parse.error);
        return { message: 'Form data is not valid' };
    }

    const data = parse.data;

    try {
        await dbConnect();

        const existingUser = await UserModel.findOne({ email: data.email });

        if (!existingUser) {
            return { message: 'User not found' };
        }

        // Update fields if they are provided in the form data
        if (data.name) {
            existingUser.name = data.name;
        }
        if (data.email) {
            existingUser.email = data.email;
        }

        if (data.password) {
            // Hash the new password before updating
            existingUser.password = await bcryptjs.hash(data.password, 10);
        }
        if (data.address) {
            existingUser.address = data.address;
        }
        if (data.address) {
            existingUser.address = data.address;
        }
        if (data.city) {
            existingUser.city = data.city;
        }
        if (data.postal) {
            existingUser.postal = data.postal;
        }
        if (data.country) {
            existingUser.country = data.country;
        }
        // Save the updated user
        await existingUser.save();
        revalidatePath('/')
        // You can return the updated user or a success message if needed
        return { message: 'User updated successfully', user: JSON.parse(JSON.stringify(existingUser)) };
    } catch (e) {
        console.error(e);
        return { message: 'Failed to update user' };
    }
}

// REVIEWS

export async function updateReview(prevState: any, formData: FormData) {
    const schema = z.object({
        productId: z.string().min(3),
        name: z.string().min(3),
        email: z.string().min(1),
        avatar: z.string().min(1),
        subject: z.string().min(3),
        review: z.string().min(1),
        rating: z.number().min(1)
    });

    const parse = schema.safeParse({
        productId: formData.get('productId'),
        name: formData.get('name'),
        email: formData.get('email'),
        avatar: formData.get('avatar'),
        subject: formData.get('subject'),
        review: formData.get('review'),
        rating: Number(formData.get('rating'))
    });

    if (!parse.success) {
        console.log(parse.error.message);
        return { message: 'Please complete the review' };
    }

    const data = parse.data;

    try {
        // Replace with your actual dbConnect implementation
        await dbConnect();

        const product = await ProductModel.findById({ _id: data.productId });

        if (!product) {
            return { message: 'Product not found' };
        }

        const plainReview = {
            name: data.name,
            email: data.email,
            avatar: data.avatar,
            subject: data.subject,
            review: data.review,
            rating: data.rating
        };
        console.log(plainReview)
        product.reviews.push(plainReview);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((a: any, c: { rating: any }) => a + c.rating, 0)
            / product.reviews.length;
        await product.save();

        revalidatePath('/');

        return { message: 'Review successfully', product: JSON.parse(JSON.stringify(product)) };
    } catch (e) {
        console.error(e);
        return { message: 'Failed to review' };
    }
}

export async function submitQuestion(prevState: any, formData: FormData) {
    const schema = z.object({
        productId: z.string().min(3),
        title: z.string().min(1),
    });
    const parse = schema.safeParse({
        productId: formData.get('productId'),
        title: formData.get('title'),
    });
    if (!parse.success) {
        console.log(parse.error);
        return { message: 'Form data is not valid' };
    }
    const data = parse.data;

    try {
        await dbConnect();

        const newQuestion = new TaskModel({
            product: data.productId,
            title: data.title,

        });
        const newQuestionDoc: any = await newQuestion.save(newQuestion);
        revalidatePath('/');
        return { message: 'Question successfully', user: JSON.parse(JSON.stringify(newQuestionDoc)) };

    } catch (e) {
        console.error(e);
        return { message: 'Question Failed ' };
    }
}


export async function submitLike(prevState: any, formData: FormData) {
    const schema = z.object({
        _id: z.string().min(3),

    });
    const parse = schema.safeParse({
        _id: formData.get('_id'),

    });
    if (!parse.success) {
        console.log(parse.error);
        return { message: 'Form data is not valid' };
    }
    const data = parse.data;

    try {
        const session = await getServerSession();
        if (!session?.user?.email ) {
            return { message: 'Please signin to vote' }
          }
        await dbConnect();
        

        const likes = await Task.findById(data._id);
        if (likes) {
            const existLikes = likes.likes.find((x:any) => x.user == session?.user?.email);
            if (!existLikes) {
                const review = { user: session?.user?.email }
                likes.likes.push(review)
                await likes.save();
                revalidatePath('/');
                return { message: 'Thank you for your vote', user: JSON.parse(JSON.stringify(likes)) };
            } else {
                const review = { user: session?.user?.email }
                likes.likes.pull(review)
                await likes.save();}
                revalidatePath('/');
                return { message: 'Thank you for your vote', user: JSON.parse(JSON.stringify(likes)) };

            }
            } catch (e) {
                console.error(e);
                return { message: 'Vote Failed ' };
            }
        }

