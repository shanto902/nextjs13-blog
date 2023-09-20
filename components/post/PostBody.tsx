import parse from "html-react-parser";
import Image from "next/image";

const PostBody = ({ body, locale }: { body: string; locale: string }) => {
  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        const { src, alt } = domNode.attribs;
        return (
          <Image
            className=" w-full object-cover object-center h-auto max-h-[300px] md:max-h-[600px] "
            src={src}
            alt={alt}
            width={1280}
            height={620}
          />
        );
      }
    },
  };

  const getParsedHtml = (body: string) => {
    return parse(body, options);
  };

  return <div className=" rich-text">{getParsedHtml(body)}</div>;
};

export default PostBody;
