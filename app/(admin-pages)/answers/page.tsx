
import { Toaster } from 'react-hot-toast'
import dbConnect from '@/lib/db-connect'
import TaskModel from '@/lib/task-model'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import UpdateForm from '@/app/components/Admin-navigation/update-answer'
import Sidebar from '@/app/components/Admin-navigation/sidebar'

export default async function Answers() {

  const session = await getServerSession();

  if (session?.user?.email !== "admin@example.com") {
    redirect("/")
  }
  await dbConnect()

  const NewQuestions = (await TaskModel.find() );
  const questions = JSON.parse(JSON.stringify(NewQuestions))

  const totalQuestions = (await TaskModel.countDocuments({}))


  return (
    <div className="max-w-screen-2xl mx-auto my-10">
      <div className="grid md:grid-cols-4 md:gap-5">
        <Sidebar />
        <div className="md:col-span-3">
          <div className="mx-auto max-w-2xl lg:max-w-7xl" >
            <div className="flex justify-between items-center">

              <h1 className="font-bold py-10 text-2xl ">Admin Answers</h1>
              <Toaster />
            </div>

            Total customer question :  {totalQuestions}
            <table className="table text-center ">
              <thead>
                <tr className='bg-base-200'>
                  <th>Id</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody >
                {questions.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No questions found</td>
                  </tr>
                ) : (
                  questions.map((question: any) => (
                    <tr key={question._id} >
                      <td>{question._id}</td>
                      <td>
                        {question.title}
                      </td>
                      <td className='text-neutral-content'>{question.description}</td>
                      <UpdateForm
                        _id={question._id}
                        description={question.description}
                      />
                    </tr>
                  ))
                )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}