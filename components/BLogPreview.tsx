import React from "react";
import { BlogPost } from "../types/blog";
import { BlogHeader } from "./BlogHeader";

export const BLogPreview: React.FC<BlogPost> = ({
  bodyText,
  title,
  createdAt,
  tags,
  author,
}) => {
  const previewText: string = bodyText.substring(0, 150) + "...";
  return (
    <section>
      <BlogHeader createdAt={createdAt} author={author} />
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2">{previewText}</p>
      <div className=" flex gap-3">
        {tags.map((tag, idx) => {
          return (
            <p
              key={idx}
              className="bg-sky-600 px-2 mt-2 font-semibold rounded-xl text-zinc-800"
            >
              {tag}
            </p>
          );
        })}
      </div>
    </section>
  );
};
