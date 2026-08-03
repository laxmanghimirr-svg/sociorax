import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Star,
  Download,
  Share2,
  Check,
  Shield,
  Smartphone,
  Activity,
  Zap,
  MapPin,
  BatteryCharging,
  BarChart3,
  Dumbbell,
  Timer,
  Target,
  PlusCircle,
  Award,
  WifiOff,
  Sliders,
  Layers,
  Maximize2,
  ShieldCheck,
  FileImage,
  Eye,
  QrCode,
  ShieldAlert,
  Wifi,
  Sparkles,
  Clock,
  Image as ImageIcon,
  Crop,
  Wand2,
  FileText,
  Copy,
  Edit3,
  Lock,
  Cpu,
  Terminal,
  BookOpen,
  ClipboardCopy,
  FolderHeart,
  MessageSquare,
  User,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { AppItem } from '../types/app';
import { AppMockup } from './AppMockup';
import { LogoMark } from './Primitives';
import { getReviewsForApp, addReviewForApp, AppReview } from '../utils/reviews';

interface AppDetailPageProps {
  app: AppItem;
  onBack: () => void;
  onOpenDownloadModal?: () => void;
}

export function AppDetailPage({ app, onBack, onOpenDownloadModal }: AppDetailPageProps) {
  const [reviews, setReviews] = useState<AppReview[]>([]);
  const [ratingInput, setRatingInput] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [userNameInput, setUserNameInput] = useState<string>('');
  const [commentInput, setCommentInput] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setReviews(getReviewsForApp(app.id));
    setRatingInput(5);
    setHoverRating(null);
    setUserNameInput('');
    setCommentInput('');
    setSubmitSuccess(false);
    setFormError(null);
  }, [app.id]);

  const isComingSoon = app.isComingSoon || app.downloadSize === 'Coming Soon';
  const totalReviews = reviews.length;

  let displayRating = app.rating;
  let displayReviewsCount = 'No reviews yet';

  if (!isComingSoon) {
    if (totalReviews > 0) {
      const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
      displayRating = (sum / totalReviews).toFixed(1);
      displayReviewsCount = `${totalReviews} ${totalReviews === 1 ? 'review' : 'reviews'}`;
    } else {
      displayRating = app.rating;
      displayReviewsCount = 'No reviews yet';
    }
  }

  const displaySize = isComingSoon ? 'Coming Soon' : app.downloadSize;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComingSoon) return;

    if (!userNameInput.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!commentInput.trim()) {
      setFormError('Please write a review comment.');
      return;
    }

    setFormError(null);
    addReviewForApp(app.id, {
      userName: userNameInput,
      rating: ratingInput,
      comment: commentInput,
    });

    // Update reviews immediately
    const updated = getReviewsForApp(app.id);
    setReviews(updated);

    // Reset form while keeping 5 stars preselected
    setUserNameInput('');
    setCommentInput('');
    setRatingInput(5);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  // Helper to map string icon names to Lucide icon components
  const renderIcon = (iconName: string) => {
    const iconClass = "w-5 h-5 text-blue-400";
    switch (iconName) {
      case 'Activity': return <Activity className={iconClass} />;
      case 'Zap': return <Zap className={iconClass} />;
      case 'MapPin': return <MapPin className={iconClass} />;
      case 'BatteryCharging': return <BatteryCharging className={iconClass} />;
      case 'BarChart3': return <BarChart3 className={iconClass} />;
      case 'Share2': return <Share2 className={iconClass} />;
      case 'Dumbbell': return <Dumbbell className={iconClass} />;
      case 'Timer': return <Timer className={iconClass} />;
      case 'Target': return <Target className={iconClass} />;
      case 'PlusCircle': return <PlusCircle className={iconClass} />;
      case 'Award': return <Award className={iconClass} />;
      case 'WifiOff': return <WifiOff className={iconClass} />;
      case 'Sliders': return <Sliders className={iconClass} />;
      case 'Layers': return <Layers className={iconClass} />;
      case 'Maximize2': return <Maximize2 className={iconClass} />;
      case 'ShieldCheck': return <ShieldCheck className={iconClass} />;
      case 'FileImage': return <FileImage className={iconClass} />;
      case 'Eye': return <Eye className={iconClass} />;
      case 'QrCode': return <QrCode className={iconClass} />;
      case 'ShieldAlert': return <ShieldAlert className={iconClass} />;
      case 'Wifi': return <Wifi className={iconClass} />;
      case 'Sparkles': return <Sparkles className={iconClass} />;
      case 'Clock': return <Clock className={iconClass} />;
      case 'Image': return <ImageIcon className={iconClass} />;
      case 'Crop': return <Crop className={iconClass} />;
      case 'Wand2': return <Wand2 className={iconClass} />;
      case 'FileText': return <FileText className={iconClass} />;
      case 'Copy': return <Copy className={iconClass} />;
      case 'Edit3': return <Edit3 className={iconClass} />;
      case 'Lock': return <Lock className={iconClass} />;
      case 'Cpu': return <Cpu className={iconClass} />;
      case 'Terminal': return <Terminal className={iconClass} />;
      case 'BookOpen': return <BookOpen className={iconClass} />;
      case 'ClipboardCopy': return <ClipboardCopy className={iconClass} />;
      case 'FolderHeart': return <FolderHeart className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  const playStoreLink = app.playStoreUrl && app.playStoreUrl.trim().length > 0 ? app.playStoreUrl : '#';
  const apkLink = app.apkUrl && app.apkUrl.trim().length > 0 ? app.apkUrl : '#';

  const handleApkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (apkLink === '#') {
      e.preventDefault();
      if (onOpenDownloadModal) {
        onOpenDownloadModal();
      } else {
        alert(`APK link placeholder for ${app.name}. Replace the 'apkUrl' property in src/data/appsData.ts with your actual .apk file URL.`);
      }
    }
  };

  return (
    <div className="relative z-10 w-full min-h-screen text-white pb-24">
      {/* Top Sticky Navigation Bar */}
      <div className="sticky top-0 z-40 w-full bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 md:px-12 py-3.5 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition-colors py-1.5 px-2.5 sm:px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div className="flex items-center gap-2 truncate">
          <LogoMark className="w-6 h-6 shrink-0" />
          <span className="font-bold text-sm sm:text-base truncate">{app.name}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={apkLink}
            download={app.apkUrl ? `${app.slug}.apk` : undefined}
            onClick={handleApkClick}
            target={apkLink.startsWith('http') ? '_blank' : undefined}
            rel={apkLink.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md cursor-pointer"
            title="Download Android APK file directly"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download APK</span>
          </a>

          <a
            href={playStoreLink}
            onClick={(e) => {
              if (playStoreLink === '#') {
                e.preventDefault();
              }
            }}
            target={playStoreLink.startsWith('http') ? '_blank' : undefined}
            rel={playStoreLink.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Play Store</span>
          </a>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8 md:pt-12">
        {/* App Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="liquid-glass rounded-3xl p-6 md:p-10 border border-white/10 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Large App Logo Badge */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-purple-600/30 border border-white/20 p-2 shrink-0 flex items-center justify-center shadow-2xl relative group">
                <LogoMark className="w-full h-full object-cover rounded-xl" />
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium border border-white/10">
                  <span>{app.category}</span>
                  <span>•</span>
                  <span>v{app.version}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                  {app.name}
                </h1>

                <p className="text-white/70 text-base max-w-xl leading-relaxed">
                  {app.tagline}
                </p>

                {/* Ratings & Metadata bar */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-white/60 pt-2">
                  {!isComingSoon && (
                    <div className="flex items-center gap-1.5 text-amber-400 font-semibold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{displayRating}</span>
                      <span className="text-white/40">({displayReviewsCount})</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-white/40" />
                    <span>Size: {displaySize}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{isComingSoon ? 'Coming Soon' : 'Verified & Safe'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Download Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
              <a
                href={apkLink}
                download={app.apkUrl ? `${app.slug}.apk` : undefined}
                onClick={handleApkClick}
                target={apkLink.startsWith('http') ? '_blank' : undefined}
                rel={apkLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-2xl text-sm transition-all shadow-xl hover:shadow-emerald-500/20 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download APK</span>
              </a>

              <a
                href={playStoreLink}
                onClick={(e) => {
                  if (playStoreLink === '#') {
                    e.preventDefault();
                  }
                }}
                target={playStoreLink.startsWith('http') ? '_blank' : undefined}
                rel={playStoreLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white/90 text-sm font-medium rounded-2xl border border-white/15 transition-all cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span>Google Play Store</span>
              </a>
            </div>
          </div>

          {/* Highlights bullet points */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {app.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-white/80 bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Screenshots & Interactive App Previews */}
        <section className="mt-12 md:mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                App Screenshots & Live Previews
              </h2>
              <p className="text-xs text-white/60 mt-1">
                Visual preview of key screens and interfaces inside {app.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            {app.screenshots.map((screen, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="liquid-glass rounded-3xl p-5 border border-white/10 flex flex-col items-center justify-between hover:border-white/20 transition-all group"
              >
                <div className="w-full flex justify-center py-4">
                  <AppMockup type={screen.mockupType} title={screen.title} />
                </div>

                <div className="mt-4 text-center space-y-1">
                  <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {screen.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {screen.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About App & Detailed Description */}
        <section className="mt-12 md:mt-16">
          <div className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/10 space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">
              About {app.name}
            </h2>
            <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
              {app.longDescription}
            </p>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="mt-12 md:mt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Key Features & Capabilities
            </h2>
            <p className="text-xs text-white/60 mt-1">
              Everything built into {app.name} to maximize productivity and efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {app.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="liquid-glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-3 hover:border-white/20 transition-all"
              >
                <div className="p-3 w-fit rounded-xl bg-blue-500/10 border border-blue-500/20">
                  {renderIcon(feature.iconName)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Specifications & Compatibility Sidebar */}
        <section className="mt-12 md:mt-16">
          <div className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">
              Technical Specifications
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-xs">
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-white/40 block">Version</span>
                <span className="font-semibold text-white">{app.version}</span>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-white/40 block">Updated</span>
                <span className="font-semibold text-white">{app.updatedDate}</span>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-white/40 block">Download Size</span>
                <span className="font-semibold text-white">{displaySize}</span>
              </div>

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-white/40 block">Category</span>
                <span className="font-semibold text-white truncate block">{app.category}</span>
              </div>

              {!isComingSoon ? (
                <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-white/40 block">Rating</span>
                  <span className="font-semibold text-amber-400">★ {displayRating}</span>
                </div>
              ) : (
                <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-white/40 block">Status</span>
                  <span className="font-semibold text-blue-400">Coming Soon</span>
                </div>
              )}

              <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                <span className="text-white/40 block">Developer</span>
                <span className="font-semibold text-white">Sociorax Inc.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews & Ratings Section */}
        <section className="mt-12 md:mt-16">
          <div className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/10 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                  <span>User Reviews & Ratings</span>
                </h2>
                <p className="text-xs text-white/60 mt-1">
                  {isComingSoon
                    ? 'PDF Scanner is coming soon. Reviews are currently disabled.'
                    : 'Share your feedback or see what others think about ' + app.name}
                </p>
              </div>

              {!isComingSoon && (
                <div className="flex items-center gap-4 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-lg">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span>{displayRating}</span>
                  </div>
                  <div className="h-4 w-[1px] bg-white/15" />
                  <span className="text-xs text-white/70 font-medium">{displayReviewsCount}</span>
                </div>
              )}
            </div>

            {isComingSoon ? (
              <div className="p-8 text-center bg-white/[0.02] rounded-2xl border border-white/10 space-y-2">
                <Clock className="w-8 h-8 text-blue-400 mx-auto opacity-80" />
                <h3 className="text-base font-semibold text-white">App Release Pending</h3>
                <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
                  PDF Scanner is currently in active development. Rating and review submissions will become available upon public release.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Review Submission Form */}
                <div className="lg:col-span-5 bg-white/[0.03] p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Leave a Review</h3>
                    <p className="text-xs text-white/60 mb-4">
                      Submit your experience with {app.name}
                    </p>

                    {submitSuccess && (
                      <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Thank you! Your review has been submitted.</span>
                      </div>
                    )}

                    {formError && (
                      <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        {formError}
                      </div>
                    )}

                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      {/* Star Rating Selection */}
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-2">
                          Rating Selection
                        </label>
                        <div className="flex items-center gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const activeStar = (hoverRating !== null ? hoverRating : ratingInput) >= star;
                            return (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setRatingInput(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(null)}
                                className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                              >
                                <Star
                                  className={`w-6 h-6 transition-colors ${
                                    activeStar ? 'fill-amber-400 text-amber-400' : 'text-white/30 fill-transparent'
                                  }`}
                                />
                              </button>
                            );
                          })}
                          <span className="ml-2 text-xs font-medium text-amber-400">
                            {hoverRating !== null ? hoverRating : ratingInput} / 5
                          </span>
                        </div>
                      </div>

                      {/* Name Input */}
                      <div>
                        <label htmlFor="review-name" className="block text-xs font-medium text-white/70 mb-1.5">
                          Your Name
                        </label>
                        <input
                          id="review-name"
                          type="text"
                          value={userNameInput}
                          onChange={(e) => setUserNameInput(e.target.value)}
                          placeholder="e.g. Alex Johnson"
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>

                      {/* Comment Input */}
                      <div>
                        <label htmlFor="review-comment" className="block text-xs font-medium text-white/70 mb-1.5">
                          Your Review
                        </label>
                        <textarea
                          id="review-comment"
                          rows={3}
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder="Write your review comments here..."
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Review</span>
                      </button>
                    </form>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">
                      Recent Reviews ({reviews.length})
                    </h3>
                    <span className="text-[11px] text-white/50">Newest first</span>
                  </div>

                  {reviews.length === 0 ? (
                    <div className="p-8 text-center bg-white/[0.02] rounded-2xl border border-white/10 space-y-2">
                      <MessageSquare className="w-8 h-8 text-white/30 mx-auto" />
                      <p className="text-xs font-medium text-white/70">No reviews yet</p>
                      <p className="text-[11px] text-white/40 max-w-xs mx-auto">
                        Be the first user to submit a review for {app.name}!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                      {reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 hover:border-white/20 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-300 font-bold text-xs">
                                {rev.userName.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-xs font-semibold text-white">{rev.userName}</span>
                            </div>

                            <span className="text-[10px] text-white/40">{rev.date}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= rev.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-white/20 fill-transparent'
                                }`}
                              />
                            ))}
                          </div>

                          <p className="text-xs text-white/80 leading-relaxed whitespace-pre-line">
                            {rev.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Call To Action */}
        <section className="mt-12 md:mt-16 text-center">
          <div className="liquid-glass rounded-3xl p-8 md:p-12 border border-white/15 flex flex-col items-center space-y-6">
            <LogoMark className="w-12 h-12" />
            <div className="space-y-2 max-w-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Get Started with {app.name} Today
              </h2>
              <p className="text-xs text-white/60">
                Experience maximum efficiency, speed, and privacy on your device.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={apkLink}
                download={app.apkUrl ? `${app.slug}.apk` : undefined}
                onClick={handleApkClick}
                target={apkLink.startsWith('http') ? '_blank' : undefined}
                rel={apkLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-2xl text-sm shadow-xl cursor-pointer transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download {app.name} APK</span>
              </a>

              <a
                href={playStoreLink}
                onClick={(e) => {
                  if (playStoreLink === '#') {
                    e.preventDefault();
                  }
                }}
                target={playStoreLink.startsWith('http') ? '_blank' : undefined}
                rel={playStoreLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-2xl text-sm border border-white/15 cursor-pointer transition-all"
              >
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span>Google Play Store</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
