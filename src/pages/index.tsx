import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { getBlogs } from "../../server/blogs";
import { BlogPost } from "../../types/blog";
import { BLogPreview } from "../../components/BLogPreview";

const Home: NextPage = ({
  blogData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main className="w-screen h-screen overflow-auto flex flex-col items-center bg-zinc-600 text-neutral-300 font-roboto">
      <title>Home page</title>
      <section>
        <div className="mt-3 text-center">
          <h1 className="text-[3rem]">Welcome to devBlog</h1>
          <p>A full-stack blog with Next.js, TailwindCss, github GraphQL</p>
        </div>
      </section>
      <section className="flex flex-col items-center text-[1.15rem] mt-12">

        <div className="flex gap-3 mb-12"></div>
        {blogData.map((blog: BlogPost) => {
          return (
            <div key={blog.id} className="max-w-[28em] max-h-[20em] overflow-hidden mx-6 mb-6 bg-neutral-300 text-zinc-800 rounded-lg p-4 hover:bg-neutral-500 hover:text-neutral-200 transition-all duration-300">
              <a href={blog.url} target="_blank" rel="noreferrer">
                <BLogPreview
                  title={blog.title}
                  bodyText={blog.bodyText}
                  createdAt={blog.createdAt}
                  author={blog.author}
                  tags={blog.tags}
                />
              </a>
            </div>
          )
        })}

      </section>
    </main>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs()
  console.log(blogs)
  return {
    props: {
      blogData: blogs
    }
  }
}
