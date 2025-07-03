import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date for template display
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  try {
    // Handle various date formats
    let date: Date;
    
    // Check if dateString is in DD/MM/YYYY format
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
      date = new Date(year, month - 1, day);
    } else {
      date = new Date(dateString);
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString; // Return original string if parsing failed
    }
    
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

// Format address with privacy options
export function formatAddress(address: string, city: string, state: string, country: string, pincode?: string): string {
  const parts = [address, city, state, country].filter(Boolean);
  
  if (pincode) {
    parts.push(`${pincode}`);
  }
  
  return parts.join(', ');
}

// Helper to get age from birth date
export function calculateAge(dateOfBirth: string): number {
  if (!dateOfBirth) return 0;
  
  try {
    let birthDate: Date;
    
    // Handle DD/MM/YYYY format
    if (dateOfBirth.includes('/')) {
      const [day, month, year] = dateOfBirth.split('/').map(part => parseInt(part, 10));
      birthDate = new Date(year, month - 1, day);
    } else {
      birthDate = new Date(dateOfBirth);
    }
    
    // Check if valid date
    if (isNaN(birthDate.getTime())) {
      return 0;
    }
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  } catch (error) {
    console.error('Error calculating age:', error);
    return 0;
  }
}

//  Image converter to base64
export const toBase64 = async (url: string): Promise<string> => {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)

    const blob = await res.blob()
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string)
        } else {
          reject('Reader result is null')
        }
      }
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(blob)
    })
  } catch (err) {
    console.error('🚨 Failed to convert image to base64:', err)
    return ''
  }
}