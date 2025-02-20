// app/page.js
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Profile from '../components/Profile';
import SocialIcons from '../components/SocialIcons';
import ContactIcons from '../components/ContactIcons';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

export default function Home() {
  const [comments, setComments] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Ambil komentar dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(savedComments);
    setIsMounted(true);
  }, []);

  // Simpan komentar ke localStorage setiap kali komentar berubah
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, newComment]);
  };

  // Variants untuk animasi stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Jarak antar animasi anak
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-10 relative overflow-hidden">
      {/* Bulatan Animasi */}
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div>

      {/* Konten Utama dengan Animasi */}
      <AnimatePresence>
        {isMounted && (
          <motion.div
            className="max-w-md w-full p-6 space-y-6 bg-gray-900/80 backdrop-blur-md rounded-lg shadow-lg relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={childVariants}>
              <Profile />
            </motion.div>
            <motion.div variants={childVariants}>
              <SocialIcons />
            </motion.div>
            <motion.div variants={childVariants}>
              <ContactIcons />
            </motion.div>
            <motion.div variants={childVariants}>
              <h1 className="font-bold text-lg border-b-2 border-purple-500 pb-1 px-1 inline-block">
                Comment
              </h1>
            </motion.div>
            <motion.div variants={childVariants}>
              <CommentList comments={comments} />
            </motion.div>
            <motion.div variants={childVariants}>
              <CommentForm onCommentSubmit={handleCommentSubmit} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
