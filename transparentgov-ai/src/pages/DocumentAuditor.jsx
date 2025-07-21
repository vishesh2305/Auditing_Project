// src/pages/DocumentAuditor.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { UploadCloud, Send, FileText, Bot, User, LoaderCircle } from 'lucide-react';

// A simple markdown-to-HTML converter
const Markdown = ({ content }) => {
    const formattedContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')       // Italic
        .replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5">$1</code>') // Inline code
        .replace(/\n/g, '<br />'); // Newlines
    return <p dangerouslySetInnerHTML={{ __html: formattedContent }} />;
};


const DocumentAuditor = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [isQuerying, setIsQuerying] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the chat container when new messages are added
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setError(null);
        } else {
            setError('Please select a valid PDF file.');
            setFile(null);
            setFileName('');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('No file selected.');
            return;
        }

        setIsUploading(true);
        setError(null);
        setChatHistory([]); // Clear history for new document

        const formData = new FormData();
        formData.append('document', file);

        try {
            const response = await axios.post('http://localhost:3001/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsReady(true);
            setChatHistory([{
                sender: 'bot',
                message: `Document "${fileName}" processed successfully. I'm ready to answer your questions.`
            }]);
        } catch (err) {
            setError('Failed to upload or process the document. Please check the server.');
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleQuerySubmit = async (e) => {
        e.preventDefault();
        if (!query.trim() || isQuerying) return;

        const userMessage = { sender: 'user', message: query };
        setChatHistory(prev => [...prev, userMessage]);
        setQuery('');
        setIsQuerying(true);

        try {
            const response = await axios.post('http://localhost:3001/api/query', { query });
            const botMessage = { sender: 'bot', message: response.data.answer };
            setChatHistory(prev => [...prev, botMessage]);
        } catch (err) {
            const errorMessage = { sender: 'bot', message: 'Sorry, I encountered an error. Please try again.' };
            setChatHistory(prev => [...prev, errorMessage]);
            console.error(err);
        } finally {
            setIsQuerying(false);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
                        Intelligent Document Auditor
                    </h1>
                    <p className="text-md text-gray-600 dark:text-gray-400 mt-2">
                        Upload a document to begin an AI-powered audit and Q&A session.
                    </p>
                </header>

                {!isReady ? (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 sm:p-12">
                            <UploadCloud className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".pdf"
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Select PDF Document
                            </label>
                            {fileName && (
                                <div className="mt-4 flex items-center text-gray-700 dark:text-gray-300">
                                    <FileText className="w-5 h-5 mr-2" />
                                    <span>{fileName}</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-6 text-center">
                            <button
                                onClick={handleUpload}
                                disabled={!file || isUploading}
                                className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center mx-auto"
                            >
                                {isUploading ? (
                                    <>
                                        <LoaderCircle className="animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    'Start Audit'
                                )}
                            </button>
                            {error && <p className="text-red-500 mt-4">{error}</p>}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col" style={{ height: '70vh' }}>
                        {/* Chat History */}
                        <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto">
                            {chatHistory.map((chat, index) => (
                                <div key={index} className={`flex items-start gap-3 my-4 ${chat.sender === 'user' ? 'justify-end' : ''}`}>
                                    {chat.sender === 'bot' && (
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                                            <Bot size={20} />
                                        </div>
                                    )}
                                    <div className={`max-w-lg p-3 rounded-lg ${chat.sender === 'user' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                                        <div className="text-gray-800 dark:text-gray-200 text-sm">
                                            <Markdown content={chat.message} />
                                        </div>
                                    </div>
                                    {chat.sender === 'user' && (
                                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white flex-shrink-0">
                                            <User size={20} />
                                        </div>
                                    )}
                                </div>
                            ))}
                             {isQuerying && (
                                 <div className="flex items-start gap-3 my-4">
                                     <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                                         <Bot size={20} />
                                     </div>
                                     <div className="max-w-lg p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center">
                                         <LoaderCircle className="animate-spin text-blue-600" />
                                     </div>
                                 </div>
                             )}
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <form onSubmit={handleQuerySubmit} className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Ask a question about the document..."
                                    className="flex-grow p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 dark:text-gray-200"
                                />
                                <button
                                    type="submit"
                                    disabled={!query.trim() || isQuerying}
                                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                                >
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentAuditor;
