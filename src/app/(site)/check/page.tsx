// // 'use client'
// // import {
// //   Document,
// //   Page,
// //   Text,
// //   View,
// //   StyleSheet,
// //   Image,
// // } from '@react-pdf/renderer'
// // import { PDFViewer } from '@react-pdf/renderer'
// // import bg from '../../../../public/images/template-previews/template_2.png'
// import bg1 from '../../../../public/images/template-previews/template_1.jpg'
// // import { useState } from 'react'
// // const YourComponent = () => {
// //     const [bgImage, setBgImage] = useState(false)
// //   // Define styles for PDF document
// //   const styles = StyleSheet.create({
// //     page: {
// //       // padding: 40,
// //       zIndex: 1,
// //       position: 'relative',
// //       top: 40,
// //       left: 40,
// //       bottom: 40,
// //     },
// //     pages: {
     
// //     },
// //     backgroundImage: {
// //       padding: 0,
// //       zIndex: -1,
// //       objectFit: 'cover',
// //       objectPosition:"center",
// //       position: 'absolute',
// //       width: '100%',
// //       height: '100%',
// //       flex: 1,
// //       left: -40,
// //       top: -40,
// //       // bottom: -40,
// //     },
// //     section: {
  
// //     },
// //     title: {
// //       fontSize: 24,
// //       textAlign: 'center',
// //       marginBottom: 20,
// //     },
// //     text: {
// //       fontSize: 12,
// //       marginBottom: 10,
// //     },
// //     divider: {
// //       borderBottomWidth: 1,
// //       borderBottomColor: '#EEEEEE',
// //       marginVertical: 10,
// //     },
// //   })

// //   // Create PDF Document component
// //   const MyDocument = () => (
// //     <Document>
// //       <Page
// //         size="A4"
// //         style={styles.page}
// //         fixed
        
// //       >
// //         <Image
// //           // break
// //           fixed
// //           // src={ bgImage ?bg.src : bg1.src}
// //               src={bgImage ? '/images/template-previews/template_2.png' : '/images/template-previews/template_1.jpg'}
// //           style={styles.backgroundImage}
// //           // width={500}
// //           // height={300}
// //         />
// //         <View style={styles.pages}>
// //           <View style={styles.section}>
// //             <Text style={styles.title}>Check Page</Text>
// //             <Text style={styles.text}>
// //               This is a sample content for the check page.
// //             </Text>
// //             <Text style={styles.text}>
// //               This content will be converted to PDF.
// //             </Text>
// //             <View style={styles.divider} />
// //             <Text style={styles.text}>
// //               Additional sample content to demonstrate PDF generation.
// //             </Text>
// //           </View>
// //           <View style={styles.section}>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 2</Text>
// //             <Text style={styles.text}>This is additional content line 3</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 2</Text>
// //             <Text style={styles.text}>This is additional content line 3</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 2</Text>
// //             <Text style={styles.text}>This is additional content line 3</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>

// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 2</Text>
// //             <Text style={styles.text}>This is additional content line 3</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 2</Text>
// //             <Text style={styles.text}>This is additional content line 3</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 2</Text>
// //             <Text style={styles.text}>This is additional content line 3</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 2</Text>
// //             <Text style={styles.text}>This is additional content line 3</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 2</Text>
// //             <Text style={styles.text}>This is additional content line 3</Text>
// //             <Text style={styles.text}>This is additional content line 1</Text>
// //             <Text style={styles.text}>This is additional content line 2</Text>
// //             <Text style={styles.text}>This is additional content line 3</Text>
// //           </View>
// //         </View>
// //         {/* <Image
// //           // break
// //           fixed
// //           src={bg.src}
// //           style={styles.backgroundImage}
// //           // width={500}
// //           // height={300}
// //         /> */}
// //       </Page>
// //     </Document>
// //   )

// //   // ... rest of the component remains unchanged
// //   return (
// //     <div
// //       className="p-6"
// //       style={{
// //         backgroundImage: "url('/images/template-previews/bg.png')",
// //         backgroundSize: 'cover',
// //         backgroundPosition: 'center',
// //         backgroundRepeat: 'no-repeat',
// //         minHeight: '100vh',
// //       }}
// //     >
// //       <PDFViewer showToolbar={false}  width={600} height={800} className="border-2 border-gray-300">
// //         <MyDocument />
// //       </PDFViewer>

// //       <div className="mt-4 space-x-4">
// //         <button
// //           onClick={() => setBgImage(!bgImage)}
// //           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
// //         >
// //           change
// //         </button>
// //         <button
// //           // onClick={downloadAsPDF}
// //           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
// //         >
// //         </button>
// //       </div>
// //     </div>
// //   )
// // }

// // export default YourComponent
// 'use client'
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
// } from '@react-pdf/renderer'
// import { useState, useEffect } from 'react'
// import dynamic from 'next/dynamic'

// // Import your background images
// import bg from '../../../../public/images/template-previews/template_2.png'
// import bg1 from '../../../../public/images/template-previews/template_1.jpg'

// // Dynamically import PDFViewer to avoid SSR issues
// const PDFViewer = dynamic(
//   () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="w-[600px] h-[800px] bg-gray-200 flex items-center justify-center border-2 border-gray-300">
//         Loading PDF Viewer...
//       </div>
//     ),
//   }
// )

// const YourComponent = () => {
//   const [bgImage, setBgImage] = useState(false)
//   const [isClient, setIsClient] = useState(false)

//   // Ensure we're on the client side
//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   // Define styles for PDF document
//   const styles = StyleSheet.create({
//     page: {
//       position: 'relative',
//       padding: 40,
//     },
//     backgroundImage: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//       objectPosition: 'center',
//       zIndex: -1,
//     },
//     contentContainer: {
//       position: 'relative',
//       zIndex: 1,
//       backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background for readability
//       padding: 20,
//       borderRadius: 8,
//     },
//     section: {
//       marginBottom: 20,
//     },
//     title: {
//       fontSize: 24,
//       textAlign: 'center',
//       marginBottom: 20,
//       fontWeight: 'bold',
//     },
//     text: {
//       fontSize: 12,
//       marginBottom: 10,
//       lineHeight: 1.5,
//     },
//     divider: {
//       borderBottomWidth: 1,
//       borderBottomColor: '#EEEEEE',
//       marginVertical: 10,
//     },
//   })

//   // Create PDF Document component
//   const MyDocument = () => (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Background Image */}
//         <Image
//           src={bgImage ? bg.src || bg : bg1.src || bg1}
//           style={styles.backgroundImage}
//           fixed
//         />

//         {/* Content */}
//         <View style={styles.contentContainer}>
//           <View style={styles.section}>
//             <Text style={styles.title}>Check Page</Text>
//             <Text style={styles.text}>
//               This is a sample content for the check page.
//             </Text>
//             <Text style={styles.text}>
//               This content will be converted to PDF.
//             </Text>
//             <View style={styles.divider} />
//             <Text style={styles.text}>
//               Additional sample content to demonstrate PDF generation.
//             </Text>
//             <Text style={styles.text}>
//               Current background: {bgImage ? 'Template 2' : 'Template 1'}
//             </Text>
//           </View>

//           <View style={styles.section}>
//             <Text style={styles.text}>This is additional content line 1</Text>
//             <Text style={styles.text}>This is additional content line 2</Text>
//             <Text style={styles.text}>This is additional content line 3</Text>
//             <Text style={styles.text}>This is additional content line 4</Text>
//             <Text style={styles.text}>This is additional content line 5</Text>
//             <Text style={styles.text}>This is additional content line 6</Text>
//             <Text style={styles.text}>This is additional content line 7</Text>
//             <Text style={styles.text}>This is additional content line 8</Text>
//             <Text style={styles.text}>This is additional content line 9</Text>
//             <Text style={styles.text}>This is additional content line 10</Text>
//             <Text style={styles.text}>This is additional content line 11</Text>
//             <Text style={styles.text}>This is additional content line 12</Text>
//             <Text style={styles.text}>This is additional content line 13</Text>
//             <Text style={styles.text}>This is additional content line 14</Text>
//             <Text style={styles.text}>This is additional content line 15</Text>
//             <Text style={styles.text}>This is additional content line 16</Text>
//             <Text style={styles.text}>This is additional content line 17</Text>
//             <Text style={styles.text}>This is additional content line 18</Text>
//             <Text style={styles.text}>This is additional content line 19</Text>
//             <Text style={styles.text}>This is additional content line 20</Text>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   )

//   // Don't render until we're on the client
//   if (!isClient) {
//     return (
//       <div className="p-6 min-h-screen bg-gray-100">
//         <div className="w-[600px] h-[800px] bg-gray-200 flex items-center justify-center border-2 border-gray-300">
//           Loading...
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div
//       className="p-6"
//       style={{
//         backgroundImage: "url('/images/template-previews/bg.png')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         minHeight: '100vh',
//       }}
//     >
//       <div className="mb-4">
//         <h1 className="text-2xl font-bold text-white mb-2">
//           PDF Background Changer
//         </h1>
//         <p className="text-white">
//           Current template: {bgImage ? 'Template 2 (PNG)' : 'Template 1 (JPG)'}
//         </p>
//       </div>

//       <PDFViewer
//         showToolbar={false}
//         width={600}
//         height={800}
//         className="border-2 border-gray-300 shadow-lg"
//       >
//         <MyDocument />
//       </PDFViewer>

//       <div className="mt-4 space-x-4">
//         <button
//           onClick={() => setBgImage(!bgImage)}
//           className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 font-medium"
//         >
//           {bgImage ? 'Switch to Template 1' : 'Switch to Template 2'}
//         </button>

//         <button
//           onClick={() => {
//             // Add download functionality here if needed
//             console.log('Download button clicked')
//           }}
//           className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 font-medium"
//         >
//           Download PDF
//         </button>

//         <button
//           onClick={() => {
//             console.log('Current background state:', bgImage)
//             console.log(
//               'Background image source:',
//               bgImage ? bg.src || bg : bg1.src || bg1
//             )
//           }}
//           className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors duration-200 font-medium"
//         >
//           Debug Info
//         </button>
//       </div>
//     </div>
//   )
// }

// export default YourComponent
// 'use client'
// import { useRef } from 'react'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'

// export default function BiodataPDF() {
//   const biodataRef = useRef<HTMLDivElement>(null)

//   const handleDownload = async () => {
//     const input = biodataRef.current
//     if (!input) return

//     // Create canvas with higher scale for better quality
//     const canvas = await html2canvas(input, {
//       scale: 2, // higher DPI
//       useCORS: true, // if using images later
//     })

//     const imgData = canvas.toDataURL('image/png')
//     const pdf = new jsPDF('p', 'mm', 'a4')

//     const pdfWidth = pdf.internal.pageSize.getWidth()
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//     pdf.save('biodata.pdf')
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
//       {/* 👇 PDF CONTENT */}
//       <div
//         ref={biodataRef}
//         className="e text-black w-[210mm] h-auto p-10 shadow-md"
//         style={{ minHeight: '297mm' }} // A4 size: 210mm x 297mm
//       >
//         <h1 className="text-3xl font-bold mb-4">Somil Agrawal</h1>
//         <p className="text-xl mb-2">Software Developer</p>
//         <p className="text-base">
//           Experienced in building modern web applications using Next.js,
//           Firebase, and Tailwind CSS.
//         </p>
//       </div>

//       {/* 👇 BUTTON */}
//       <button
//         onClick={handleDownload}
//         className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
//       >
//         Download PDF
//       </button>
//     </div>
//   )
// }
// 'use client'
// import { useRef } from 'react'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'

// export default function BiodataPDF() {
//   const biodataRef = useRef<HTMLDivElement>(null)

//   const handleDownload = async () => {
//     try {
//       const input = biodataRef.current
//       if (!input) return

//       const canvas = await html2canvas(input, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: '#ffffff',
//       })

//       const imgData = canvas.toDataURL('image/png')
//       const pdf = new jsPDF('p', 'mm', 'a4')

//       const pdfWidth = pdf.internal.pageSize.getWidth()
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width

//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//       pdf.save('biodata.pdf')
//     } catch (error) {
//       console.error('Error generating PDF:', error)
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white p-10">
//       <div
//         ref={biodataRef}
//         className="text-black p-10 shadow-md bg-white"
//         style={{ width: '794px', minHeight: '1123px' }}
//       >
//         <h1 className="text-3xl font-bold mb-4">Somil Agrawal</h1>
//         <p className="text-xl mb-2">Software Developer</p>
//         <p className="text-base">
//           Experienced in building modern web applications using Next.js,
//           Firebase, and Tailwind CSS.
//         </p>
//       </div>

//       <button
//         onClick={handleDownload}
//         className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
//       >
//         Download PDF
//       </button>
//     </div>
//   )
// }
// "use client"
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   PDFDownloadLink,
//   PDFViewer
// } from '@react-pdf/renderer'
// import bg from '../../../../public/images/template-previews/template_1.jpg'

// const styles = StyleSheet.create({
//   page: {
//     position: 'relative',
//     fontSize: 12,
//     fontFamily: 'Helvetica',
//   },
//   pages: {
//     padding: 40,
//   },
//   backgroundImage: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     zIndex: -1,
//   },
//   contentWrapper: {
//     flex: 1,
//     position: 'relative',
//     margin: 40, // safe zone (matches border in image)
//     // zIndex: 10,
//   },
//   safeArea: {
//     // margin: 40, // 👈 this matches the border area in your background image
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 5,
//   },
// })

// export const BiodataPDFDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//     {/* <Page size="A4" style={styles.pages}> */}
//       {/* Background Image */}

//       {/* Content Area */}
//       <View style={styles.contentWrapper}>
//         {/* Offset content inside "safe" area */}
//         <View style={styles.safeArea}>
//           <Text style={styles.name}>Somil Agrawal</Text>
//           <Text style={styles.subtitle}>Software Developer</Text>
//           <Text>
//             Experienced in building modern web applications using Next.js,
//             Firebase, and Tailwind CSS.
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, aspernatur dolor! Tenetur blanditiis odit dolor cum architecto harum doloribus atque similique. Ab excepturi nam laboriosam itaque explicabo nihil qui. Quia culpa facere unde pariatur sequi maxime nemo, nostrum ipsum similique voluptatem libero veniam! Iste accusamus inventore aut ex nihil, temporibus laboriosam vero reprehenderit harum quia quisquam praesentium placeat! Quia dolore saepe molestiae suscipit vel tempore distinctio, fugiat nemo cupiditate. Eligendi vitae non, eos quaerat consequuntur ducimus voluptatem ullam doloremque beatae, fugit vel repellat ipsa sit obcaecati ratione dolorum dolorem reprehenderit itaque corrupti, quas expedita in? Libero, iusto harum dolorum corporis quis nostrum, voluptates ad distinctio voluptas necessitatibus aliquid quo! Repudiandae esse voluptatem sunt, facere eius, cumque reiciendis debitis dolore a minima dignissimos cupiditate distinctio qui, accusamus quas sapiente nesciunt doloremque at natus consectetur possimus hic! Asperiores quibusdam nobis et exercitationem soluta. Aliquid hic, placeat enim modi, saepe libero mollitia ipsam illum animi ratione, voluptatum debitis! Veritatis eveniet ullam dolore laudantium velit architecto ex temporibus accusamus illo nisi, tempore officiis, ducimus culpa impedit cumque nam. Ducimus suscipit eveniet nihil repellat maiores obcaecati hic cum, quaerat reprehenderit nisi? Asperiores eum expedita corporis, perferendis excepturi minima eligendi culpa, similique temporibus atque repudiandae quo corrupti aut quod dolor. Atque, facilis dolor placeat porro neque ducimus aut dolorum commodi vel aperiam autem odio at dolorem beatae eligendi officia laudantium molestiae nihil modi inventore. Magnam doloremque cumque blanditiis, amet enim sunt illo dolore expedita! Commodi corporis iste accusamus vel nihil rerum veritatis suscipit quasi numquam. Doloremque iusto repellat eligendi blanditiis impedit! Quam sit aliquam commodi! Accusamus a deserunt nam, vitae aliquam quibusdam consequatur dolor quidem illo quaerat molestias natus quo eos laudantium saepe aspernatur doloribus numquam facilis veniam maiores. Doloremque maiores est quod hic aut, necessitatibus, commodi veniam dicta ullam velit, atque animi. Quia eum sed commodi, quibusdam nisi quisquam ipsum? Iure quidem ipsa atque ipsum blanditiis doloremque magni ad praesentium numquam sint accusamus autem quod, consequatur aperiam nobis aspernatur natus excepturi aut suscipit. Reprehenderit rem excepturi officiis similique ex adipisci dolores dicta expedita iusto doloremque! Voluptatibus iste architecto necessitatibus in blanditiis quos fugit pariatur quaerat error, rem nam eum sequi quo temporibus modi! Veniam fuga suscipit neque vero id iste unde cupiditate eos, autem, a, in cumque. Ipsum officiis excepturi sequi labore, totam iste et nam nisi libero ducimus, accusamus expedita. Amet laboriosam mollitia vero expedita eius sunt ex! Blanditiis totam id consequatur odio delectus iste minima qui eum dicta culpa consectetur veniam et dolorem, impedit vero voluptatum! Hic doloribus iure, ex laboriosam illo beatae aspernatur iste ipsum necessitatibus, error eius officiis! Fugit exercitationem vel iusto incidunt ratione perferendis consequatur neque vero quis ab, eos aliquid, architecto ut id laudantium, consectetur explicabo deserunt alias quam dolorum provident pariatur. Harum magni eum illum fuga ipsam nulla, tenetur sequi id quibusdam dolores cumque vitae nihil assumenda, dicta facere. Nobis laudantium, asperiores cumque nam minima accusamus corrupti excepturi est quaerat nostrum exercitationem praesentium harum, atque repellat rem voluptas quo eos vel et consequuntur. Ipsam sed possimus sequi aspernatur iusto, nulla quas animi. Non rerum harum praesentium vitae sapiente dolores iure vero error. Quia magnam veniam quas non ab accusantium vitae nulla laborum odit iure illo odio voluptatem assumenda veritatis omnis, repudiandae sequi praesentium hic dolorum molestias itaque voluptates! Quibusdam quam officiis velit dolorem labore cupiditate perspiciatis, vero, aperiam deserunt ipsum odio dolores cum sit! Amet provident nam error at laudantium delectus, animi porro dicta esse necessitatibus temporibus praesentium reiciendis perspiciatis optio doloremque accusamus nobis cupiditate quas facere veniam sit ipsam voluptas iusto! Dignissimos, sapiente repellat natus vel nobis eos sequi sint architecto assumenda animi necessitatibus molestias dolorem sed harum quisquam voluptate autem placeat. Vel fugit sunt quos pariatur aut cupiditate praesentium possimus, porro obcaecati minus cum perferendis dolorem ducimus, facilis architecto doloribus eaque voluptatum expedita illo rem ratione a libero! Omnis asperiores sit ex in exercitationem porro optio labore, neque tempore modi harum officiis dolor ea iste nulla! Laudantium odit porro ipsa dignissimos vero tempora maxime facere, molestias, sed explicabo quo earum quos quod illum eius, veritatis repellat ea omnis dolorem eligendi voluptatem. Quasi vel, suscipit nulla accusamus sit, beatae nam ipsam obcaecati rerum voluptas assumenda sunt! Ab tempore aut cum, velit atque neque est minima, explicabo id corporis blanditiis beatae! Laboriosam temporibus porro praesentium in libero veniam ducimus similique voluptatem dignissimos cupiditate. Distinctio atque nesciunt corrupti soluta dignissimos animi velit tenetur exercitationem vel blanditiis illum omnis, cupiditate, ad corporis adipisci quibusdam accusantium tempore in culpa magni expedita asperiores, at eaque natus. Ad magnam, dicta vero praesentium quaerat fugiat assumenda veniam non aspernatur, quas suscipit nulla. Aspernatur consectetur, repudiandae esse eveniet dolores inventore illum optio, in totam assumenda recusandae omnis eum quod enim iure natus autem nemo dolorum ab quidem corrupti consequatur doloribus dolorem. Ipsam quidem sequi, doloribus optio voluptatum, tenetur quaerat libero qui autem cupiditate iure perspiciatis, expedita quasi. Alias dolorum corporis placeat perferendis assumenda earum sed, obcaecati illo! Id repellendus iusto dolorum, quae tenetur hic minus dolorem ipsum facere ex accusamus officia eveniet illo fugit ea! Autem, suscipit assumenda consequuntur et dolores minima, architecto, blanditiis quia ex deserunt enim. A architecto recusandae eum ullam qui saepe perferendis ea earum quas ad. Nam et voluptatem sunt impedit quasi explicabo ducimus reiciendis, corporis eaque in voluptatibus nostrum facilis placeat quia, aspernatur molestias enim beatae magnam consequuntur debitis? Laborum quibusdam minima aliquam doloribus sapiente repellendus dolorum repellat sed possimus culpa hic explicabo consectetur amet iusto numquam corporis, accusantium corrupti enim repudiandae officia? Quia, ut, doloribus pariatur tempora mollitia, cumque reiciendis voluptas corrupti quam est accusantium sit! Deserunt vero blanditiis excepturi natus harum non! Ad alias quibusdam, omnis debitis, aliquid, facere perspiciatis optio consequatur quam dicta laboriosam cumque iusto laudantium magni. Nostrum odio voluptatibus cupiditate ad, eaque officia officiis dignissimos mollitia minus minima cum neque, obcaecati aspernatur itaque. Error sapiente necessitatibus quidem delectus eius velit, voluptatibus voluptatum repellat in quae quasi, itaque sunt cupiditate assumenda omnis ad nesciunt esse nemo, eveniet sed aliquid? Perspiciatis, commodi? Iste inventore est itaque, omnis dicta debitis ducimus minus accusantium modi iure natus qui magni, expedita illo odio eveniet repudiandae ipsum necessitatibus, asperiores consequuntur a! Beatae, laudantium aut quae repudiandae deserunt ullam iste blanditiis suscipit minima est officiis, tempora delectus dignissimos earum ipsa. Culpa vel placeat expedita magnam mollitia assumenda quia laudantium soluta neque qui possimus sint fugiat facere rem, excepturi animi quod hic labore cumque ipsa. Eum, porro blanditiis mollitia fugit facere, fugiat laboriosam tempora esse ad architecto iure, quos vel consectetur illum ab ipsam! Aperiam, nam vel adipisci vitae ratione tempore odit possimus. Voluptatem nihil magni ipsam omnis cupiditate. Non reprehenderit eaque accusamus quo vitae quia maxime iste ex optio, eius ducimus deleniti. Quaerat, ea placeat? Nihil porro sapiente labore fugiat consequatur ab quae repudiandae tempore autem temporibus! Inventore error facilis explicabo provident iure eos sunt impedit eveniet, odio cupiditate accusamus facere, praesentium eligendi architecto iste quo. Mollitia unde dolore ullam cum nesciunt corrupti beatae necessitatibus saepe laudantium, eos in quo consectetur maxime deleniti libero odit quod consequatur minima adipisci iste autem! Nam laudantium ut numquam, vel accusantium quo beatae quisquam ea, natus maxime molestiae reiciendis repellendus autem ad assumenda obcaecati esse veniam velit, delectus saepe. Eos consequatur et odio dicta iure reprehenderit. Repellat dolorem fuga sint id atque harum laboriosam, voluptatum unde exercitationem ut enim impedit reiciendis quasi numquam repudiandae inventore accusamus voluptate vero maiores nam nihil quae natus. Cum voluptatem explicabo inventore voluptatibus facere aliquam iusto fugiat autem quod repellendus corporis aut expedita, quia, nam laborum nostrum fugit aspernatur velit reprehenderit vel quidem reiciendis quibusdam? Unde ipsa quam a similique deleniti officia sed voluptate praesentium deserunt aliquam, ex quasi tempore eos magnam consequatur fugit id quidem voluptatibus laborum rerum. Quibusdam rerum reprehenderit provident voluptatibus molestias asperiores eos quod error ratione maiores earum, nemo vero saepe numquam iure illum consequuntur nam? Eius hic, alias iusto voluptatem sapiente rem sint quibusdam modi accusantium, vero, veritatis molestiae tenetur blanditiis. Perferendis reprehenderit veritatis placeat. Quos fugit quidem ipsa voluptatum praesentium reprehenderit aliquid iure iusto eius perferendis accusantium illo dolor corporis, maxime facere recusandae? Aliquam nulla doloremque harum esse aspernatur ipsa eveniet veniam officia, ipsum sequi quo libero molestias quia nam illum blanditiis numquam, deleniti sapiente consectetur magni illo qui, odit dicta? Omnis ullam sequi expedita at quae repellat odio repellendus ad ea eum, aspernatur vero sint eos molestiae eaque, ratione rem nam? Voluptates doloremque itaque nam unde, vitae debitis laboriosam! Quas a officiis adipisci tenetur eaque pariatur voluptatum repudiandae nostrum, quaerat fugiat, incidunt harum, cupiditate illo necessitatibus rem dicta ex minus nisi. Odit quas odio asperiores dolor, optio earum natus quia expedita impedit ab placeat, doloremque fugit? Sunt in deleniti quia aspernatur harum dolorem nihil quam libero! Rerum consequuntur sapiente veniam beatae dicta ipsum nisi, et suscipit odio maxime praesentium corrupti ipsa facilis sequi placeat quibusdam iste! Ipsam, illum repellendus? Ea numquam deleniti cum velit, amet at doloribus ipsa voluptatibus esse dolorem aperiam perspiciatis hic eos minus labore! Pariatur, doloremque expedita quidem quas commodi mollitia. Animi nam porro maxime quisquam aspernatur. Consequatur, cum quam vitae, dolor eius, nam corporis blanditiis ea a cumque mollitia. Rerum distinctio explicabo mollitia accusamus labore ratione a assumenda, recusandae sunt, cum, blanditiis delectus modi veritatis! Aspernatur distinctio sequi dolorem quidem, ipsum accusamus ex repellat minus quos fugiat? Architecto non fuga, odit nemo qui quam porro consequuntur ipsum consequatur explicabo aspernatur labore tenetur numquam eius. Eligendi tempore eum a necessitatibus ut sed accusantium velit! Possimus officiis voluptatum molestias quam, reprehenderit commodi quibusdam sit soluta nam culpa, explicabo quod excepturi esse dolorum eaque, tempora consectetur odio sequi doloremque at ea. Veniam odio atque quis dicta natus, totam voluptates libero quos asperiores sint alias consectetur excepturi animi suscipit maxime minima, optio, autem eligendi impedit. Quod quasi, hic, laudantium ex voluptatem neque beatae sed iusto soluta quae culpa debitis quidem labore fugit officia qui ducimus placeat earum, veniam consequuntur ipsam perspiciatis rem suscipit? Mollitia, labore minima soluta harum impedit asperiores exercitationem voluptatum maiores vel odit ducimus ut quaerat odio ad tenetur suscipit quae eum dignissimos architecto, iure nesciunt quam animi incidunt. Quae, placeat voluptate veritatis corrupti suscipit esse, laboriosam eos impedit rem accusantium sit sunt maiores blanditiis adipisci asperiores deserunt quos! Est, nisi eos. Quia suscipit modi incidunt possimus optio, adipisci quaerat labore corrupti sit quibusdam accusantium temporibus, magnam repellat neque voluptates quae? Vero id repellat laudantium voluptatem rerum. At quibusdam consequatur tenetur qui, facere aspernatur repellendus sint quia mollitia magni eum quis dolorem atque. Necessitatibus totam in sequi rerum facere explicabo ipsa repudiandae earum voluptatem dolore fugit accusantium repellendus omnis, quisquam rem tempora sit libero doloremque obcaecati autem, incidunt minus, iusto sapiente deleniti. Provident commodi quod sed sunt iusto impedit nobis aliquid, eligendi, ratione dolor debitis, iste architecto nostrum. Vero nobis veritatis amet quam odio eligendi ipsum ipsa eveniet similique quod voluptatibus quas esse quasi officia, atque labore et possimus velit doloremque mollitia eos modi rem voluptatum! Distinctio consequuntur non, odit molestias ab expedita consectetur, consequatur porro velit quidem recusandae minima laudantium quae! Doloribus labore amet nihil quo numquam nulla nisi aperiam deserunt sapiente reiciendis quod enim voluptate hic dolores fugiat adipisci modi, eos natus animi velit quae? Ratione veritatis doloribus, aliquid accusamus exercitationem odit mollitia necessitatibus enim iure corrupti officia aliquam quos cum porro facilis suscipit iste fugiat provident possimus, perferendis incidunt. Similique, molestias quo nulla, labore minus quidem nisi odio totam veritatis illum dolorem quibusdam incidunt. Ipsum odio nisi cupiditate beatae earum sunt ab accusamus sapiente ipsam natus, minus omnis consectetur, asperiores explicabo at iusto saepe repudiandae cumque autem iste, placeat consequatur dolorum! Suscipit, eaque. Nihil voluptate delectus beatae dicta vero ullam officiis necessitatibus labore et accusantium eligendi ducimus alias, velit facere libero quaerat sed hic repellat mollitia nemo est ex a voluptas. Accusamus voluptatibus modi perspiciatis, cupiditate voluptatum quidem possimus quasi hic. Deleniti expedita illo fuga, at ea odio provident maxime qui. Deleniti id cum sequi repellat necessitatibus, praesentium alias obcaecati omnis porro nemo, eligendi officiis adipisci eius et facilis iste. Repudiandae iusto eaque, soluta, a nihil deserunt iste excepturi impedit id cupiditate quas similique aliquam voluptatum. Excepturi tenetur fugiat eos velit? Repellendus facere iure, earum eveniet ducimus laudantium sapiente?
//           </Text>
//         </View>
//       </View>
//     {/* </Page> */}
//       <Image
//         fixed
//         src={bg.src} // ✅ your border image
//         style={styles.backgroundImage}
//       />
//     </Page>
//   </Document>
// )


// export default function DownloadPDFPage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-10">
//       <h1 className="text-2xl font-bold mb-4">Download Biodata</h1>
//       <PDFViewer style={{ width: 800, height: 600 }}>
//         <BiodataPDFDocument />
//       </PDFViewer>
//       <PDFDownloadLink
//         document={<BiodataPDFDocument />}
//         fileName="somil-biodata.pdf"
//       >
//         {({ loading }) =>
//           loading ? (
//             <button className="bg-gray-400 text-white px-4 py-2 rounded">
//               Preparing PDF...
//             </button>
//           ) : (
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
//               Download PDF
//             </button>
//           )
//         }
//       </PDFDownloadLink>
//     </div>
//   )
// }
'use client'
import { usePDF } from 'react-to-pdf'

const Component = () => {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' })
  console.log("🚀 ~ Component ~ targetRef:", targetRef)
  console.log("🚀 ~ Component ~ toPDF:", toPDF)
  return (
    <div>
      <button onClick={() => toPDF()}>Download PDF</button>
      <div ref={targetRef}>Content to be generated to PDF</div>
    </div>
  )
}
export default Component