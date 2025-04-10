import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | UPSCMONK</title>
        <meta name="description" content="UPSCMONK privacy policy details how we collect, use, and protect your personal information." />
      </Head>
      
      <div className="bg-neutral-50 min-h-screen py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Back to homepage link */}
          <Link href="/">
            <span className="inline-flex items-center text-primary hover:text-primary-700 font-medium mb-8">
              <ArrowLeft size={16} className="mr-2" />
              Back to home
            </span>
          </Link>
          
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900">Privacy Policy</h1>
            <p className="text-neutral-500 mb-8">Last updated: April 5, 2025</p>

            <div className="prose max-w-none">
              <p>
                At UPSCMONK, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services.
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access UPSCMONK.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">1. Information We Collect</h2>
              <p>We collect information in the following ways:</p>
              
              <h3 className="text-lg font-medium mt-6 mb-3">1.1 Information You Provide to Us</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Account Information:</strong> When you register, we collect your name, email address, password, and optionally, your phone number and profile picture.</li>
                <li><strong>Profile Information:</strong> Information you add to your profile such as education background, career goals, and areas of interest.</li>
                <li><strong>Payment Information:</strong> If you subscribe to our premium services, we collect payment details through our secure payment processors.</li>
                <li><strong>User-Generated Content:</strong> Notes, comments, posts, and messages you create on our platform.</li>
                <li><strong>Communication Data:</strong> When you contact us directly, we record the communications for customer service and quality improvement purposes.</li>
              </ul>

              <h3 className="text-lg font-medium mt-6 mb-3">1.2 Information Collected Automatically</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Device Information:</strong> We collect information about the device you use to access UPSCMONK, including device type, operating system, unique device identifiers, and mobile network information.</li>
                <li><strong>Usage Information:</strong> We track your activity on UPSCMONK, such as content you view, features you use, time spent, and search queries.</li>
                <li><strong>Location Information:</strong> With your consent, we may collect and process information about your geographical location.</li>
                <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to collect and store information about your interactions with UPSCMONK.</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Provide, maintain, and improve UPSCMONK services</li>
                <li>Process transactions and send related information</li>
                <li>Personalize your experience and deliver content relevant to your interests</li>
                <li>Send administrative messages, updates, security alerts, and support messages</li>
                <li>Monitor usage patterns and analyze trends to enhance user experience</li>
                <li>Prevent fraudulent activities and enforce our terms of service</li>
                <li>Develop new products and services</li>
                <li>Respond to your comments and questions</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">3. Information Sharing and Disclosure</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following situations:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>With Service Providers:</strong> We share information with third-party vendors and service providers who perform services for us (e.g., payment processing, data analysis, email delivery, hosting services).</li>
                <li><strong>For Legal Reasons:</strong> We may disclose your information if required by law or in response to valid requests by public authorities (e.g., court orders, government agencies).</li>
                <li><strong>With Your Consent:</strong> We may share your information with third parties when we have your consent to do so.</li>
                <li><strong>Business Transfers:</strong> If UPSCMONK is involved in a merger, acquisition, or sale of all or a portion of its assets, your information may be transferred as part of that transaction.</li>
                <li><strong>Aggregate or De-identified Information:</strong> We may share aggregate or de-identified information that cannot reasonably be used to identify you.</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal information. 
                However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              <p>
                We encourage you to use a strong password and to keep your account information confidential. 
                We are not responsible for circumvention of any privacy settings or security measures contained on our platform.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">5. Your Data Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>The right to access your personal information</li>
                <li>The right to rectify or update your personal information</li>
                <li>The right to erase your personal information</li>
                <li>The right to restrict or object to our processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw your consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided at the end of this policy.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">6. Data Retention</h2>
              <p>
                We will retain your personal information only for as long as necessary to fulfill the purposes for which we collected it, 
                including to satisfy legal, accounting, or reporting requirements.
              </p>
              <p>
                When deciding how long to keep your information, we consider the amount, nature, and sensitivity of the personal information, 
                the potential risk of harm from unauthorized use or disclosure, and applicable legal requirements.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">7. Children's Privacy</h2>
              <p>
                UPSCMONK is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. 
                If you are a parent or guardian and you believe your child has provided us with personal information, 
                please contact us so that we can delete the information.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">8. Third-Party Links</h2>
              <p>
                UPSCMONK may contain links to third-party websites, plugins, and applications. 
                Clicking on those links or enabling those connections may allow third parties to collect or share data about you. 
                We do not control these third-party websites and are not responsible for their privacy statements. 
                We encourage you to read the privacy policy of every website you visit.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">9. Cookies Policy</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your browsing activities and to distinguish you from other users. 
                This helps us provide you with a good experience when you use UPSCMONK and allows us to improve our platform.
              </p>
              <p>
                You can set your browser to refuse all or some browser cookies or to alert you when websites set or access cookies. 
                If you disable or refuse cookies, please note that some parts of UPSCMONK may become inaccessible or not function properly.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
                and updating the "Last updated" date at the top of this policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. 
                Changes to this Privacy Policy are effective when they are posted on this page.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: privacy@upscmonk.com<br />
                Address: 123 Education Street, New Delhi, India 110001<br />
                Phone: +91 99999 88888
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-neutral-200">
              <p className="text-neutral-600">
                By using UPSCMONK, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;