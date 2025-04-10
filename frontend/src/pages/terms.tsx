import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Terms and Conditions | UPSCMONK</title>
        <meta name="description" content="UPSCMONK terms and conditions for platform usage, privacy, and content policies." />
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
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-neutral-900">Terms and Conditions</h1>
            <p className="text-neutral-500 mb-8">Last updated: April 5, 2025</p>

            <div className="prose max-w-none">
              <p>
                Welcome to UPSCMONK. Please read these Terms and Conditions carefully before using our website or mobile application.
                By accessing or using UPSCMONK, you agree to be bound by these Terms. If you disagree with any part of the Terms,
                you may not access or use our services.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">1. Definitions</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>"UPSCMONK"</strong> refers to our website, mobile application, and services.</li>
                <li><strong>"User"</strong> refers to anyone who accesses or uses UPSCMONK.</li>
                <li><strong>"Content"</strong> refers to all materials, information, data, and resources available on UPSCMONK.</li>
                <li><strong>"Subscription"</strong> refers to the premium paid access to UPSCMONK.</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">2. User Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our platform.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access UPSCMONK and for any activities or actions under your password.
                We encourage you to use a strong, unique password for your account.
              </p>
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">3. Subscription and Payments</h2>
              <p>
                UPSCMONK offers both free and paid subscription tiers with different features and access levels.
                By subscribing to our premium service, you agree to pay the subscription fees as described at the time of purchase.
              </p>
              <p>
                All payments are processed securely through our payment providers. We do not store your credit card information.
                Subscription fees are charged at the beginning of each billing period (monthly or annually), and your subscription will automatically renew 
                unless you cancel it before the renewal date.
              </p>
              <p>
                Refunds are provided as per our Refund Policy, which can be found on our website.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">4. Intellectual Property Rights</h2>
              <p>
                The content, features, and functionality of UPSCMONK, including but not limited to text, graphics, logos, icons, images, audio clips, 
                digital downloads, and software, are owned by UPSCMONK or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not modify, reproduce, distribute, create derivative works or adaptations of, publicly display or perform, republish, download, store, 
                transmit, or otherwise exploit any content on UPSCMONK without our express prior written permission.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">5. User-Generated Content</h2>
              <p>
                By posting, uploading, or sharing any content on UPSCMONK, you grant us a non-exclusive, royalty-free, transferable, 
                sub-licensable license to use, reproduce, modify, adapt, publish, translate, and distribute your content in any existing or future media formats.
              </p>
              <p>
                You represent and warrant that your content does not violate any third-party rights, including copyright, trademark, privacy, 
                or other personal or proprietary rights, and does not contain any defamatory, harmful, or illegal material.
              </p>
              <p>
                We reserve the right to remove any content that violates these Terms or that we find objectionable for any reason, without prior notice.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">6. Prohibited Activities</h2>
              <p>You agree not to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Use UPSCMONK in any way that could damage, disable, overburden, or impair our services</li>
                <li>Use any robot, spider, or other automated device to access UPSCMONK</li>
                <li>Transmit any worms, viruses, or code of a destructive nature</li>
                <li>Attempt to gain unauthorized access to our systems or user accounts</li>
                <li>Use UPSCMONK for any illegal or unauthorized purpose</li>
                <li>Share your account credentials with others or allow others to use your account</li>
                <li>Engage in any activity that interferes with or disrupts UPSCMONK</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">7. Limitation of Liability</h2>
              <p>
                In no event shall UPSCMONK, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses, resulting from your access to or use of or inability to access or use UPSCMONK.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">8. Disclaimer</h2>
              <p>
                UPSCMONK is provided "as is" and "as available" without any warranties, either express or implied. We do not guarantee that 
                our services will always be available, uninterrupted, timely, secure, or error-free.
              </p>
              <p>
                While we strive for accuracy, we do not warrant that the content provided on UPSCMONK is accurate, complete, reliable, current, or error-free.
                The educational materials and practice tests are intended for preparation purposes only and do not guarantee success in actual examinations.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time at our discretion. We will provide notice of any significant changes 
                through our website or via email to registered users.
              </p>
              <p>
                Your continued use of UPSCMONK after any such changes constitutes your acceptance of the new Terms.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">10. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Delhi, India.
              </p>

              <h2 className="text-xl font-bold mt-8 mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                Email: legal@upscmonk.com<br />
                Address: 123 Education Street, New Delhi, India 110001<br />
                Phone: +91 99999 88888
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-neutral-200">
              <p className="text-neutral-600">
                By using UPSCMONK, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsAndConditionsPage;