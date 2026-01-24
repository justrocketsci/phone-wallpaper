'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'What is a QR code wallpaper?',
    answer: 'A QR code wallpaper is a custom phone background that includes one or more scannable QR codes. When someone views your phone lock screen, they can scan the QR code to visit a website, view your social media, or access any link you choose. It\'s a creative way to turn your lock screen into a marketing tool or personal brand showcase.',
  },
  {
    question: 'How do QR code wallpapers work?',
    answer: 'Simply create your custom wallpaper using our editor, add your desired QR codes (linking to any URL), choose your design preferences, and export the wallpaper. Set it as your phone background, and anyone who sees your lock screen can scan the QR code with their camera app to visit your links.',
  },
  {
    question: 'What devices are supported?',
    answer: 'We support a wide range of popular devices including iPhone models (iPhone 15 Pro Max, iPhone 14 Pro, iPhone 13, etc.) and Android devices (Samsung Galaxy, Google Pixel, and more). Each wallpaper is exported at the exact resolution for your specific device to ensure perfect fit.',
  },
  {
    question: 'Can I customize the design?',
    answer: 'Yes! You can choose from beautiful gradient backgrounds, customize colors, add brand icons, select different fonts, and position your QR codes exactly where you want them. Our editor gives you complete creative control while maintaining QR code scannability.',
  },
  {
    question: 'How many QR codes can I add?',
    answer: 'You can add up to 2 QR codes per wallpaper. This allows you to include multiple links - for example, one for your website and another for your Instagram profile. Each QR code is fully customizable and scannable.',
  },
  {
    question: 'How do credits work?',
    answer: 'Credits are used to download your wallpapers. Each PNG export costs 1 credit. New users get 1 free credit to try the service. You can purchase credit packs anytime - credits never expire, so you can use them whenever you\'re ready.',
  },
  {
    question: 'Can I download my wallpapers?',
    answer: 'Yes! Each wallpaper download costs 1 credit and exports a high-resolution PNG optimized for your specific device. Saving designs to your account is free and unlimited - you only use credits when you\'re ready to download.',
  },
  {
    question: 'What formats are supported?',
    answer: 'All wallpapers are exported as high-resolution PNG files, which provides the best quality for phone backgrounds while maintaining excellent QR code scannability. PNG format ensures your wallpaper looks crisp and your QR codes scan reliably.',
  },
  {
    question: 'Are the QR codes trackable?',
    answer: 'The QR codes themselves are standard QR codes that link to your specified URLs. If you want to track scans, you can use a URL shortener service (like Bitly or TinyURL) that provides analytics, or use a dedicated QR code tracking service for your destination URLs.',
  },
  {
    question: 'Can I use this for my business?',
    answer: 'Absolutely! QR code wallpapers are perfect for businesses, content creators, influencers, and professionals. Use them to promote your products, share your portfolio, drive traffic to campaigns, or make networking more effective by having your business links readily scannable.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative py-24 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Everything you need to know about QR Canvas
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-600"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 rounded-xl"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-slate-900 dark:text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

