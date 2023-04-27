import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import React from "react";
import { getBlogDetail } from "../../../server/blogs";
import { BlogHeader } from "../../../components/BlogHeader";
const parse = require("html-react-parser");
import detail from "./id.module.css";

const BlogPost: NextPage = ({
  blogData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { author, bodyHTML, createdAt, title } = blogData;
  return (
    <section className="layout">
      <div className="max-w-[50%]">
        <h1 className="text-center my-10 text-[2rem] font-bold">{title}</h1>
        <div className="flex justify-center mb-4">
          <BlogHeader createdAt={createdAt} author={author} />
        </div>
        <div className={`${detail.html} flex flex-col`}>{parse(bodyHTML)}</div>
      </div>
    </section>
  );
};

export default BlogPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const route: String[] | string | undefined = context.query.id;
  const id = Number(route);
  console.log(route);
  let blogDetail = await getBlogDetail(id);
  return {
    props: {
      blogData: blogDetail,
    },
  };
};
