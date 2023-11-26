import parse from "html-react-parser";

import "./overlayStyle.css";

import ImageWithZoom from "./ImageWtithZoom";

const PostBody = ({
  body,
  locale,
  pagePost = false,
  id,
}: {
  body: string;
  locale: string;
  pagePost?: boolean;
  id?: string;
}) => {
  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        const { src, alt } = domNode.attribs;
        return <ImageWithZoom src={src} alt={alt} id={id} />;
      }
    },
  };

  const getParsedHtml = (body: string) => {
    return parse(body, options);
  };

  return (
    <div
      className={`${locale === "bn" ? "rich-text " : "rich-text-en"} ${
        pagePost && "md:mx-[-20px]"
      } `}
    >
      {getParsedHtml(body)}
    </div>
  );
};

export default PostBody;
