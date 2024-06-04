import React, { useState } from 'react'
import './about.css'
import { useMediaQuery } from '@uidotdev/usehooks';
import Page from './Page';

const About = () => {
  const isLarge = useMediaQuery("(max-width: 767px)");

  const [activePage, setActivePage] = useState(1);

  const pages = [
    { id: 1, title: 'INTRODUCTION', content: "Welcome to CODE CRACKERS! Are you ready to embark on an exciting journey into the world of web development? Whether you're a complete beginner or looking to expand your skills, you've come to the right place. At CODE CRACKERS, we're dedicated to providing comprehensive and easy-to-understand tutorials on HTML, CSS, JavaScript, Spring Boot, and React. Our goal is to empower you with the knowledge and tools you need to create stunning websites and dynamic web applications. No matter your background or experience level, our step-by-step lessons will guide you through the fundamentals and beyond, helping you build a solid foundation in web development. From crafting beautiful layouts with HTML and CSS to adding interactivity and functionality with JavaScript, and diving into advanced frameworks like Spring Boot and React, we've got you covered. So, what are you waiting for? Let's dive in and start creating amazing things together!"} ,
    { id: 2, title: 'OUR STORY', content: "At CODE CRACKERS, our journey began with a passion for sharing knowledge and empowering others to unlock their potential in web development. Founded by codeCrackers, our mission is to make learning HTML, CSS, JavaScript, Spring Boot, and React accessible and enjoyable for everyone. Driven by our own experiences navigating the complexities of web development, we understand the importance of clear, concise, and engaging educational resources. That's why we've poured our hearts into creating step-by-step tutorials that break down even the most challenging concepts into manageable bites. With a commitment to excellence and a dedication to our community, we continue to evolve and expand our offerings to meet the needs of aspiring developers worldwide. Whether you're a complete beginner or a seasoned coder looking to sharpen your skills. Join us on this exciting journey as we explore the endless possibilities of web development together!" },
    { id: 3, title: 'PURPOSE', content: "our purpose is simple: to empower individuals like you to thrive in the world of web development. We believe that everyone deserves the opportunity to learn and master the essential skills needed to build stunning websites and dynamic web applications. With technology evolving at a rapid pace, the demand for skilled developers continues to grow. Our purpose is to bridge the gap between ambition and expertise by providing accessible, high-quality tutorials on HTML, CSS, JavaScript, Spring Boot, and React. Whether you're dreaming of launching your own startup, pursuing a career change, or simply exploring a new hobby, we're here to support you on your journey. Our purpose is to equip you with the knowledge, confidence, and resources you need to succeed in the ever-expanding digital landscape." },
    { id: 4, title: 'TEACHING PHILOSOPHY', content: "we believe that learning should be an inspiring and enriching experience. Our teaching philosophy is rooted in the principles of accessibility, clarity, and hands-on engagement. We understand that everyone learns at their own pace and in their own way. That's why our tutorials are designed to cater to diverse learning styles, providing clear explanations, practical examples, and interactive exercises to reinforce key concepts. We believe in the power of hands-on learning, where students actively engage with the material and apply their newfound knowledge in real-world scenarios. Through experimentation and exploration, we encourage our learners to embrace curiosity and creativity, fostering a deep understanding of web development principles. Above all, we strive to create a supportive and inclusive learning environment where questions are welcomed, mistakes are seen as opportunities for growth, and every individual feels empowered to reach their full potential."},
    { id: 5, title: 'COURSE AND CONTENT', content: "we offer a curated selection of courses designed to equip you with the skills and knowledge you need to succeed in web development. Our content covers a wide range of topics, from the basics of HTML and CSS to advanced frameworks like React and Spring Boot. Each course is carefully crafted to provide a comprehensive learning experience, with clear explanations, hands-on exercises, and real-world examples. Whether you're a beginner taking your first steps into the world of web development or an experienced coder looking to expand your skill set, we have something for you. Our courses are structured to accommodate different learning styles and schedules, allowing you to learn at your own pace and on your own terms. With a focus on practical application and problem-solving, you'll not only gain a deep understanding of the material but also develop the confidence to tackle real-world projects."},
    { id: 6, title: 'COMMITMENT AND QUALITY', content: "our commitment to excellence is at the heart of everything we do. We strive to provide you with the highest quality educational resources and support to help you achieve your goals in web development. Quality is not just a goal; it's a standard we uphold in every aspect of our content creation process. From meticulously crafted tutorials to responsive customer service, we prioritize your learning experience above all else. We are committed to staying up-to-date with the latest developments in web development, ensuring that our courses and content reflect the most current industry standards and best practices. Our team of experienced instructors brings a wealth of knowledge and expertise to each lesson, guiding you through complex concepts with clarity and precision. Your success is our top priority, and we are dedicated to providing you with the tools, resources, and support you need to thrive in your journey as a web developer."},
    {id: 7, title: 'MORE INFO', content: "Comprehensive Course Materials: Our courses are packed with comprehensive materials, including video tutorials, written guides, code examples, and hands-on exercises. Interactive Learning Platform: Our interactive learning platform allows you to track your progress, engage with fellow learners in discussion forums, and receive feedback. Flexible Learning Options:we offer flexible learning options to fit your schedule. we have options to accommodate your needs. Expert Support: Our team of experienced instructors is here to support you every step of the way. Whether you have questions about course material, need help troubleshooting a coding problem, or simply want advice on your career path, we're here to help. Career Resources: We're not just here to teach you how to code; we're here to help you launch a successful career."}
  ];

  const nextPage = (currentId) => {
    setActivePage(currentId + 1);
  };

  const prevPage = (currentId) => {
    setActivePage(currentId - 1);
  };

  
  return (
    <div className='w-[100%] h-[80rem] mt-[5rem] z-10 sedan-regular'> 
      <div className="container">
          {pages.map((page) => (
            <div
              key={page.id}
              style = {{
                width: isLarge ? "100%" : "70%",
                height: isLarge ? "70vh" : "60%",
              }}
              className={`page-container ${activePage === page.id ? 'active' : 'inactive'}`}
            >
              <Page
                id={page.id}
                title={page.title}
                content={page.content}
                onNext={page.id < pages.length ? nextPage : null}
                onPrev={page.id > 1 ? prevPage : null}
              />
            </div>
          ))}
        </div>
    </div>
  );
};

export default About