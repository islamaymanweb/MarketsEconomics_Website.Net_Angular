import { Component, OnInit } from '@angular/core';

interface Slide {
  image: string;
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnColor: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  slides: Slide[] = [
    {
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      badgeText: 'Financial Insights',
      badgeColor: 'primary',
      title: 'Market Analysis & Economic Trends',
      description: 'Get the latest financial data and expert analysis to guide your investment decisions.',
      primaryBtnText: 'Learn More',
      primaryBtnColor: 'primary',
      primaryBtnLink: '#',
      secondaryBtnText: 'Our Services',
      secondaryBtnLink: '#'
    },
    {
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      badgeText: 'New Report',
      badgeColor: 'success',
      title: 'Global Economic Outlook 2025',
      description: 'Discover emerging market opportunities and strategic investment recommendations.',
      primaryBtnText: 'Download Report',
      primaryBtnColor: 'success',
      primaryBtnLink: '#',
      secondaryBtnText: 'Subscribe',
      secondaryBtnLink: '#'
    },
    {
      image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      badgeText: 'Premium Service',
      badgeColor: 'warning',
      title: 'Custom Portfolio Management',
      description: 'Our expert advisors will help you build and manage a diversified investment portfolio.',
      primaryBtnText: 'Get Started',
      primaryBtnColor: 'warning',
      primaryBtnLink: '#',
      secondaryBtnText: 'Contact Advisor',
      secondaryBtnLink: '#'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize slider functionality can be added here if needed
  }
}