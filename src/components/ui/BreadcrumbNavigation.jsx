import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ className = "" }) => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    
    const breadcrumbMap = {
      'student-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
      'recorded-lectures': { label: 'Recorded Lectures', icon: 'Video' },
      'login': { label: 'Login', icon: 'LogIn' },
      'register': { label: 'Register', icon: 'UserPlus' },
    };

    const breadcrumbs = [
      { label: 'Home', path: '/', icon: 'Home' }
    ];

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const breadcrumbInfo = breadcrumbMap?.[segment];
      
      if (breadcrumbInfo) {
        breadcrumbs?.push({
          label: breadcrumbInfo?.label,
          path: currentPath,
          icon: breadcrumbInfo?.icon,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs?.length > 1 ? breadcrumbs : [];
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs?.length === 0) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={breadcrumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-2" 
              />
            )}
            
            {breadcrumb?.isLast ? (
              <span className="flex items-center space-x-1 text-foreground font-medium">
                <Icon name={breadcrumb?.icon} size={14} />
                <span className="hidden sm:inline">{breadcrumb?.label}</span>
                <span className="sm:hidden">{breadcrumb?.label?.split(' ')?.[0]}</span>
              </span>
            ) : (
              <a
                href={breadcrumb?.path}
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name={breadcrumb?.icon} size={14} />
                <span className="hidden sm:inline">{breadcrumb?.label}</span>
                <span className="sm:hidden">{breadcrumb?.label?.split(' ')?.[0]}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;