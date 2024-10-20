import React from 'react';
import ReactQuill from 'react-quill';
import { Editor } from '../../utils/typeDef';
import 'react-quill/dist/quill.snow.css';

const QuillEditor: React.FC<Editor> = ({ content, setContent }) => {
  return (
    <ReactQuill value={content} onChange={val => setContent(val)} />
  )
}

export default QuillEditor