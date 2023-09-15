import parse from 'html-react-parser'


const PostBody = ({body}:{body:string}) => {
 
  const getParsedHtml = (body : string) => {
    return parse(body)
  }

  return (
    <div className=' rich-text'>{getParsedHtml(body)}</div>
  )
}

export default PostBody