import { AppItem } from '../types/app';

export interface AppReview {
  id: string;
  appId: string;
  userName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  createdAt: number;
}

const STORAGE_PREFIX = 'sociorax_app_reviews_';

export function getReviewsForApp(appId: string): AppReview[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${appId}`);
    if (!raw) return [];
    const parsed: AppReview[] = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }
  } catch (err) {
    console.error('Failed to load reviews from localStorage', err);
  }
  return [];
}

export function addReviewForApp(
  appId: string,
  reviewData: { userName: string; rating: number; comment: string }
): AppReview {
  const currentReviews = getReviewsForApp(appId);
  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const newReview: AppReview = {
    id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    appId,
    userName: reviewData.userName.trim(),
    rating: reviewData.rating,
    comment: reviewData.comment.trim(),
    date: formattedDate,
    createdAt: Date.now(),
  };

  const updatedReviews = [newReview, ...currentReviews];
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${appId}`, JSON.stringify(updatedReviews));
  } catch (err) {
    console.error('Failed to save review to localStorage', err);
  }

  return newReview;
}

export function getAppStats(app: AppItem) {
  const isComingSoon = app.isComingSoon || app.downloadSize === 'Coming Soon';

  if (isComingSoon) {
    return {
      displayRating: '',
      displayReviewsCount: '',
      totalReviews: 0,
      reviews: [],
      isComingSoon: true,
      displaySize: 'Coming Soon',
    };
  }

  const reviews = getReviewsForApp(app.id);
  const totalReviews = reviews.length;

  let displayRating = app.rating;
  let displayReviewsCount = 'No reviews yet';

  if (totalReviews > 0) {
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    displayRating = (sum / totalReviews).toFixed(1);
    displayReviewsCount = `${totalReviews} ${totalReviews === 1 ? 'review' : 'reviews'}`;
  }

  return {
    displayRating,
    displayReviewsCount,
    totalReviews,
    reviews,
    isComingSoon: false,
    displaySize: app.downloadSize,
  };
}
