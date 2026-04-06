import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const TrainingDeliveryComparison = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-800">
                            Training <span className="gradient-text">Delivery Methods</span>
                        </h3>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Compare our flexible training approaches to find the perfect fit for your learning style and schedule.
                        </p>
                    </div>

                    <div className="feature-card-border rounded-2xl p-8 bg-white/90 backdrop-blur-sm shadow-lg overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-slate-200">
                                    <th className="text-left py-4 px-4 text-slate-800 font-bold text-lg">Features</th>
                                    <th className="text-center py-4 px-4 text-green-600 font-bold text-lg">Self-Study</th>
                                    <th className="text-center py-4 px-4 text-purple-600 font-bold text-lg">Hybrid</th>
                                    <th className="text-center py-4 px-4 text-blue-600 font-bold text-lg">Instructor-Led</th>
                                    <th className="text-center py-4 px-4 text-orange-600 font-bold text-lg">Custom</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-4 font-medium">Learn at Your Own Pace</td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                                            <span className="text-green-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full">
                                            <span className="text-purple-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded-full">
                                            <span className="text-red-600 font-bold text-lg">✗</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full">
                                            <span className="text-orange-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-4 font-medium">Live Expert Sessions</td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded-full">
                                            <span className="text-red-600 font-bold text-lg">✗</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full">
                                            <span className="text-purple-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                                            <span className="text-blue-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full">
                                            <span className="text-orange-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-4 font-medium">Dedicated Tutor Support</td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded-full">
                                            <span className="text-red-600 font-bold text-lg">✗</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full">
                                            <span className="text-purple-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                                            <span className="text-blue-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full">
                                            <span className="text-orange-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-4 font-medium">CompTIA Platform Access</td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                                            <span className="text-green-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full">
                                            <span className="text-purple-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                                            <span className="text-blue-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full">
                                            <span className="text-orange-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-4 font-medium">Exam Vouchers Included</td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                                            <span className="text-green-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full">
                                            <span className="text-purple-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                                            <span className="text-blue-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full">
                                            <span className="text-orange-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-4 font-medium">Career Services</td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded-full">
                                            <span className="text-red-600 font-bold text-lg">✗</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full">
                                            <span className="text-purple-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                                            <span className="text-blue-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full">
                                            <span className="text-orange-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-4 font-medium">Customisable Content</td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded-full">
                                            <span className="text-red-600 font-bold text-lg">✗</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded-full">
                                            <span className="text-red-600 font-bold text-lg">✗</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded-full">
                                            <span className="text-red-600 font-bold text-lg">✗</span>
                                        </div>
                                    </td>
                                    <td className="text-center py-4 px-4">
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full">
                                            <span className="text-orange-600 font-bold text-lg">✓</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="text-center mt-8">
                        <Link to="/training">
                            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg">
                                Compare All Training Options <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TrainingDeliveryComparison;