import { Card, CardContent, CardHeader } from '@/components/ui/event-card';
import { cn } from '@/lib/utils';
import { Calendar, Map } from 'lucide-react';


export function EventFeatures() {
    const timelineEvents = [
        {
            id: 1,
            time: "11:00 AM",
            title: "Check-in Stalls",
            date: "28th July 2025 (Mon)",
            description: "Exhibitor setup and preparation time",
            icon: "📦",
            tabLabel: "Day 0"
        },
        {
            id: 2,
            time: "10:00 AM to 8:00 PM",
            title: "Day 1 Fair Opens",
            date: "29th July 2025 (Tue)",
            description: "Full day of exhibition and networking",
            icon: "🎉",
            tabLabel: "Day 1"
        },
        {
            id: 3,
            time: "10:00 AM to 8:00 PM",
            title: "Day 2",
            date: "30th July 2025 (Wed)",
            description: "Second day of exhibition activities",
            icon: "📅",
            tabLabel: "Day 2"
        },
        {
            id: 4,
            time: "10:00 AM to 7:00 PM",
            title: "Day 3",
            date: "31st July 2025 (Thu)",
            description: "Final day of exhibition with early closing",
            icon: "📅",
            tabLabel: "Day 3"
        },
        {
            id: 5,
            time: "8:00 PM onwards",
            title: "Check-out",
            date: "31st July 2025 (Thu)",
            description: "Exhibitor pack-up and departure",
            icon: "📦",
            tabLabel: "Check-out"
        }
    ];

    const pricing = [
        {
            type: "BRAND WAGON",
            price: "₹6900 / SQR MTR",
            sizes: [
                "8×5 = 40 SQR – ₹276,000",
                "6×5 = 30 SQR – ₹207,000",
                "6×4 = 24 SQR – ₹165,600",
                "4×3 = 12 SQR – ₹82,800"
            ]
        },
        {
            type: "BUSINESS STALLS",
            price: "₹5900 / SQR MTR",
            sizes: [
                "8×3 = 24 SQR – ₹141,600",
                "4×3 = 12 SQR – ₹70,800"
            ]
        }
    ];

    return (
        <section className="  bg-gradient-to-r from-yellow-50 via-transparent to-purple-50 py-1 md:py-3 dark:bg-transparent">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-[85rem]">
                <div className="mx-auto grid gap-4 lg:grid-cols-2">
                    {/* Timeline Card */}
                 
                    <FeatureCard className="flex flex-col">
                        <CardHeader className="pb-3 flex-shrink-0">
                            <CardHeading
                                icon={Calendar}
                                title="Event Timeline"
                                description="Detailed schedule of the exhibition days"
                            />
                        </CardHeader>

                        <CardContent className="flex-1">
                            <div className="relative">
                                <div className="absolute -inset-6 [background:radial-gradient(50%_50%_at_75%_50%,transparent,hsl(var(--background))_100%)]"></div>
                                <div className="border rounded-lg">
                                    <div className="p-4">
                                        <div className="space-y-4">
                                            {timelineEvents.map((event) => (
                                                <div key={event.id} className="flex items-start gap-3">
                                                    <span className="text-2xl flex-shrink-0">{event.icon}</span>
                                                    <div className="min-w-0">
                                                        <div className="flex items-baseline gap-2">
                                                            <h4 className="font-medium">{event.title}</h4>
                                                            <span className="text-sm text-gray-500">{event.time}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-700">{event.date}</p>
                                                        <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </FeatureCard>
                 
                    {/* Pricing Card */}
                    <FeatureCard className="flex flex-col">
                        <CardHeader className="pb-3 flex-shrink-0">
                            <CardHeading
                                icon={Map}
                                title="Stall Pricing"
                                description="Choose the perfect stall for your business"
                            />
                        </CardHeader>

                        <div className="relative flex-1 border-t border-dashed">
                            <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,hsl(var(--muted)),white_125%)]"></div>
                            <div className="relative">
                                <div className="p-4 px-6">
                                    <p className="text-gray-500 text-sm mb-4 bg-white/90 backdrop-blur-sm py-2 -mx-2 px-2 rounded">
                                        + GST 18% applicable on all packages
                                    </p>
                                    <div className="space-y-6">
                                        {pricing.map((priceItem, index) => (
                                            <div key={index}>
                                                <h4 className="font-medium">{priceItem.type}</h4>
                                                <p className="text-sm text-gray-700 mb-2">{priceItem.price}</p>
                                                <ul className="space-y-1 text-sm text-gray-600">
                                                    {priceItem.sizes.map((size, i) => (
                                                        <li key={i}>{size}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FeatureCard>

                    {/* Important Info Card */}
                    <FeatureCard className="p-6 lg:col-span-2">
                        <p className="mx-auto my-2 max-w-md text-balance text-center text-2xl font-semibold">
                            Important information for exhibitors
                        </p>

                        <div className="flex justify-center gap-6">
                            <div className="mt-4 bg-gray-50 rounded-2xl p-6 border border-gray-200 max-w-2xl w-full">
                                <h4 className="text-lg font-medium text-gray-900 mb-3">Important Notes</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-gray-500 mr-2">•</span>
                                        <span>All prices are exclusive of GST</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-500 mr-2">•</span>
                                        <span>Early bird discounts available until March 31, 2025</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-500 mr-2">•</span>
                                        <span>Custom stall designs available upon request</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </FeatureCard>
                </div>
            </div>
        </section>
    );
}

const FeatureCard = ({ children, className }) => (
    <Card className={cn('group relative rounded-none shadow-zinc-950/5', className)}>
        <CardDecorator />
        {children}
    </Card>
);

const CardDecorator = () => (
    <>
        <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
        <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
        <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
        <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
    </>
);

const CardHeading = ({  title, description }) => (
    <div className="p-6">
        <span className="text-muted-foreground flex items-center gap-2">
            <Icon className="size-4" />
            {title}
        </span>
        <p className="mt-8 text-2xl font-semibold">{description}</p>
    </div>
);