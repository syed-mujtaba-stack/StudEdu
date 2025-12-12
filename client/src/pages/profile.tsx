import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, User as UserIcon, BookOpen, Trophy, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
    const { user, updateProfile } = useAuth();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [avatar, setAvatar] = useState(user?.avatar || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateProfile({ name, avatar });
            // Toast is handled in auth context
        } catch (error) {
            // Error handled in auth context
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="container mx-auto py-10 px-4 md:px-6">
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>

            <div className="grid gap-6 md:grid-cols-12">
                {/* User Stats/Overview */}
                <div className="md:col-span-4 space-y-6">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 relative">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={avatar || user.avatar} />
                                    <AvatarFallback className="text-xl">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                {user.emailVerified && (
                                    <Badge className="absolute -right-2 -top-2 bg-green-500 hover:bg-green-600">Verified</Badge>
                                )}
                            </div>
                            <CardTitle>{user.name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="p-4 bg-muted rounded-lg">
                                    <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                                    <div className="text-2xl font-bold">0</div>
                                    <div className="text-xs text-muted-foreground">Certificates</div>
                                </div>
                                <div className="p-4 bg-muted rounded-lg">
                                    <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                                    <div className="text-2xl font-bold">0h</div>
                                    <div className="text-xs text-muted-foreground">Learned</div>
                                </div>
                                <div className="col-span-2 p-4 bg-muted rounded-lg">
                                    <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                                    <div className="text-2xl font-bold">0</div>
                                    <div className="text-xs text-muted-foreground">Courses in Progress</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Edit Profile Form */}
                <div className="md:col-span-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Profile</CardTitle>
                            <CardDescription>
                                Update your personal information and public profile.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            value={user.email}
                                            disabled
                                            className="pl-9 bg-muted"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Email cannot be changed directly. Contact support for assistance.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="pl-9"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="avatar">Avatar URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="avatar"
                                            value={avatar}
                                            onChange={(e) => setAvatar(e.target.value)}
                                            placeholder="https://example.com/avatar.jpg"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Tip: You can use services like Gravatar or Dicebear.
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
