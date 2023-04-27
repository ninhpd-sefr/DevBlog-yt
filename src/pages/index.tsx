import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getBlogs } from "../../server/blogs";
import { BlogPost } from "../../types/blog";
import { BLogPreview } from "../../components/BLogPreview";
import { useEffect, useMemo, useState } from "react";

const Home: NextPage = ({
  blogData,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [filterWord, setFilterWord] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number[]>([]);

  // filter before render
  const filteredBlog: BlogPost[] = useMemo(() => {
    return filterWord.length > 0 /* filter when filterword exist */
      ? blogData.filter((blog: BlogPost) => {
          return filterWord.every((filter) => blog.tags.includes(filter));
          // return every key need to filter
        })
      : blogData;
  }, [filterWord]);

  const filterLabel = (tag: any, idx: number) => {
    if (selectedIdx.includes(idx)) {
      setSelectedIdx(selectedIdx.filter((id) => id !== idx));
      setFilterWord(filterWord.filter((filter) => filter !== tag.innerText));
    } else {
      setSelectedIdx([...selectedIdx, idx]);
      setFilterWord([...filterWord, tag.innerText]);
    }
  };

  useEffect(() => {
    console.log(filterWord);
  }, [selectedIdx]);

  return (
    <main className="layout">
      <title>Home page</title>
      <section>
        <div className="mt-3 text-center">
          <h1 className="text-[3rem]">Welcome to devBlog</h1>
          <p>A full-stack blog with Next.js, TailwindCss, github GraphQL</p>
        </div>
      </section>
      <section className="flex flex-col items-center text-[1.15rem] mt-12">
        <div className="flex gap-3 mb-12">
          {tags.map((tag: string, idx: number) => {
            return (
              <button
                onClick={(e) => filterLabel(e.target, idx)}
                className={`${
                  selectedIdx.includes(idx)
                    ? "layer-selected hover:bg-sky-400 transition-all duration-300"
                    : "layer hover:bg-sky-400 transition-all duration-300"
                }`}
                key={idx}
              >
                {tag}
              </button>
            );
          })}
        </div>
        {filteredBlog.map((blog: BlogPost) => {
          return (
            <div
              key={blog.id}
              className="max-w-[28em] max-h-[20em] overflow-hidden mx-6 mb-6 bg-neutral-300 text-zinc-800 rounded-lg p-4 hover:bg-neutral-500 hover:text-neutral-200 transition-all duration-300 "
            >
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
          );
        })}
      </section>
    </main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs();
  let tags: string[] = [];
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    }
  }
  return {
    props: {
      blogData: blogs,
      tags: tags,
    },
  };
};
