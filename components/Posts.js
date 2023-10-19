import React from "react";

const Posts = ({ id, post, postPage }) => {
  return (
    <div className="p-3 border-b cursor-pointer flex border-gray-700">
      {!postPage && (
        <img
          src={post?.userImg}
          alt="Profile Picture"
          className="w-11 h-11 rounded-full mr-4"
        />
      )}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt="Profile Picture"
              className="w-11 h-11 rounded-full mr-4"
            />
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${!postPage && "inline-block"}`}>{post?.username}</h4>
              <span className={`text-sm sm:test-[15px] ${!postPage && "ml-1.5"}`}>@{post?.tag}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
