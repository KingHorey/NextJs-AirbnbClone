import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

interface FooterSection {
  title: string;
  links: {
    text: string;
    href: string;
  }[];
}

const FooterComponent: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: "Support",
      links: [
        { text: "Help Center", href: "/help" },
        { text: "Safety Information", href: "/safety" },
        { text: "Cancellation Options", href: "/cancellations" },
        { text: "Disability Support", href: "/accessibility" },
        { text: "Report Concern", href: "/report" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "List Your Space", href: "/host" },
        { text: "Host Protection", href: "/protection" },
        { text: "Community Guidelines", href: "/guidelines" },
        { text: "Resource Center", href: "/resources" },
        { text: "Find Partners", href: "/partners" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", href: "/about" },
        { text: "Latest News", href: "/news" },
        { text: "Careers", href: "/careers" },
        { text: "Investors", href: "/investors" },
        { text: "Emergency Support", href: "/emergency" },
      ],
    },
  ];

  return (
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 text-sm"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">© 2024 Company Inc.</span>
              <span className="text-gray-300">·</span>
              <a
                href="/terms"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Terms
              </a>
              <span className="text-gray-300">·</span>
              <a
                href="/privacy"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Privacy
              </a>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <select className="text-sm text-gray-600 border rounded-md p-1">
                  <option>English (US)</option>
                  <option>Español</option>
                  <option>Français</option>
                </select>
                <select className="text-sm text-gray-600 border rounded-md p-1">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
